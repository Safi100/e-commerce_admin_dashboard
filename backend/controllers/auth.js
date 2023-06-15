const bcrypt = require('bcrypt')
const Admin = require('../models/admin')

module.exports.login = async (req, res) => {
    const {username, password} = req.body
    const admin = await Admin.findOne({username: username.trim()})
    if(admin && (await bcrypt.compare(password.trim(), admin.password))){
        req.session.user = admin.username
        return res.json(admin.username)
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