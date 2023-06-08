const bcrypt = require('bcrypt')
const Admin = require('../models/admin')

module.exports.renderLogin = (req, res) => {
    if(req.session.user){
        return res.redirect('/')
    }
    res.render('login', {title: "Login - Admin dashboard"})
    
}
module.exports.login = async (req, res) => {
    const {username, password} = req.body
    const admin = await Admin.findOne({username: username.trim()})
    if(admin){
        const match = await bcrypt.compare(password.trim(), admin.password)
        if(match) {
            req.session.user = admin._id
            return res.redirect('/')
        }
        req.flash('error', "Wrong username/password")
        return res.redirect('/login')
    }else{
        req.flash('error', "Wrong username/password")
        return res.redirect('/login')
    }
}
module.exports.logout = (req, res) => {
    if(req.session.user){
        req.session.destroy();
    }
    res.redirect('/login')
}