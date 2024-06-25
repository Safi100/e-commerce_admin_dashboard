const bcrypt = require('bcrypt')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const PasswordToken = require('../models/passwordToken');
const crypto = require('crypto');
const {sendEmail} = require('../utils/mail');

module.exports.login = async (req, res) => {
    try{
        const email = req.body.email.toLowerCase().trim()
        const password = req.body.password.trim()

        const admin = await Admin.findOne({email})
        if(!admin) throw new Error('Email or password incorrect')
        const match = await bcrypt.compare(password, admin.password)
        if(!match) throw new Error('Email or password incorrect')

        const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, {
            expiresIn: '30d' // Token expiration time
        });
        res.cookie('c_user', admin._id.toString());
        res.cookie('accessToken', token, { httpOnly: true }).status(200).json({token});
    }catch (e) {
        console.log(e);
        return res.status(401).json({error: e.message});
    }
}
module.exports.send_reset_mail = async (req, res) => {
    try{
        const email = req.body.email.toLowerCase().trim();
        const admin = await Admin.findOne({email});
        if(!admin) throw new Error('Email not found on system');
        const passwordToken = await PasswordToken.findOne({CustomerId: admin._id});
        // if passwordToken exist delete it and generate new one
        if(passwordToken) await passwordToken.deleteOne({CustomerId: admin._id});
        const randomToken = crypto.randomBytes(32).toString("hex");
        // hash the new password token to secure it on database
        const hashedToken = await bcrypt.hash(randomToken, 10);
        const newPasswordToken = new PasswordToken({
            CustomerId: admin._id,
            token: hashedToken
        })
        await newPasswordToken.save()
        // Send email to customer
        await sendEmail(admin.email, "Reset your password", `<p>Hi ${admin.email}</p>
        <p>Please click on the link below to reset your password</p>
        <a href="http://localhost:3000/reset-password/${admin._id}/${randomToken}">Reset Password</a>
        <p>Link will expire in 1 hour.</p>
        <p>If you didn't request a password reset, please ignore this email, and your password will remain unchanged.</p>
        `)
        res.status(200).json({success: true, message: 'Email sent successfully (check spam folder)'})
    }catch(e){
        res.status(404).json({error: e.message})
        console.log(e);
    }
}
module.exports.reset_password = async (req, res) => {
    try{
        const {id, token} = req.params;
        const password = req.body.password.trim();
        const confirmPassword = req.body.confirmPassword.trim();
        // check if user and token is valid
        if(!mongoose.Types.ObjectId.isValid(id)) throw new Error(`Invalid link`);
        const admin = await Admin.findById(id);
        if(!admin) throw new Error('Customer not found');
        const passwordResetToken = await PasswordToken.findOne({CustomerId: admin._id});
        if (!passwordResetToken) throw new Error(`Invalid link`);
        const match = await bcrypt.compare(token, passwordResetToken.token);
        if(!match) throw new Error(`Invalid link`);
        if (password !== confirmPassword) throw new Error(`Password and confirm password must match.`);
        const hashedPass = await bcrypt.hash(password, 10);
        const updatedAdmin = await Admin.findByIdAndUpdate({_id: id}, {password: hashedPass})
        if(!updatedAdmin) throw new Error(`Password didn't update.`);
        await PasswordToken.deleteOne({ CustomerId: id });
        res.send({message: 'Password changed successfully'});
    }catch(e){
        res.status(400).json({error: e.message})
        console.log(e);
    }
}
module.exports.fetchCurrentUser = async (req, res) => {
    try{
        const currentUser = await Admin.findById(req.user.id).select(['-password'])
        res.status(200).json(currentUser)
    }catch(e){
        res.status(404).json({error: e.message})
        console.log(e);
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