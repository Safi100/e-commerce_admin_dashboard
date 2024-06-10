const bcrypt = require('bcrypt')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    try{
        const email = req.body.email.toLowerCase().trim()
        const password = req.body.password.trim()

        const admin = await Admin.findOne(email)
        if(!admin) throw new Error('Email or password incorrect')
        const match = await bcrypt.compare(password, admin.password)
        if(!match) throw new Error('Email or password incorrect')

        const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, {
            expiresIn: '30d' // Token expiration time
        });
        res.cookie('c_user', admin._id.toString());
        res.cookie('accessToken', token, { httpOnly: true }).status(200).json({token});
    }catch (e) {
        return res.status(401).json({error: e.message});
    }
}
module.exports.logout = async (req, res) => {
    try{
        await res.clearCookie('accessToken');
        await res.clearCookie('c_user');
        res.status(200).send({success: true})
    }catch (e) {
        res.status(401).json({error: e.message})
    }
}