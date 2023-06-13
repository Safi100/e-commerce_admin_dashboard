const bcrypt = require('bcrypt')
const Admin = require('../models/admin')

module.exports.login = async (req, res) => {
    const {username, password} = req.body
    const admin = await Admin.findOne({username: username.trim()})
    if(admin){
        const match = await bcrypt.compare(password.trim(), admin.password)
        if(match) {
            return res.json(username)
        }else{
            return res.json(null)
        }
       }else{
        return res.json('wrong')
    }
}
module.exports.logout = (req, res) => {
    if(req.session.user){
        req.session.destroy();
    }
    res.redirect('/login')
}