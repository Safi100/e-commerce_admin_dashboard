const bcrypt = require('bcrypt')
const Admin = require('../models/admin')

module.exports.login = async (req, res) => {
    const {username, password} = req.body
    const admin = await Admin.findOne({username: username.trim()})
    if(admin && bcrypt.compare(password.trim(), admin.password)){
        req.session.user = admin.username
        return res.json(req.session.user)
    }else{
        return res.json(null)
    }
}
module.exports.logout = (req, res) => {
    if(req.session.user){
        req.session.destroy();
    }
    res.json(true)
}