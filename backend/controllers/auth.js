const bcrypt = require('bcrypt')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    const {username, password} = req.body
    const secret_key = process.env.SECRET_KEY
    try{
        const admin = await Admin.findOne({username: username.trim()})
        if(admin && (await bcrypt.compare(password.trim(), admin.password))){

            const token = jwt.sign({ username: admin.username }, secret_key, {
                expiresIn: '7d' // Token expiration time
            });
            res.cookie('accessToken', token, {
                httpOnly: true
            }).status(200).json({username, token})
            
        }else{
            res.status(400).json({
                success: false,
                message: "Username/password wrong", 
            })
        }
    }catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}
module.exports.logout = (req, res) => {
    if(req.session.user){
        req.session.destroy();
    }
    res.json(true)
}