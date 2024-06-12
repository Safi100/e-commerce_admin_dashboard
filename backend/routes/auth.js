const express = require('express')
const { login, fetchCurrentUser, logout, reset_password, send_reset_mail } = require('../controllers/auth')
const router = express.Router({mergeParams: true})
const { authenticateJWT } = require('../middleware')

router.post('/login', login)

router.get('/currentUser', authenticateJWT, fetchCurrentUser)

router.post('/logout', logout)

router.post('/send-reset-mail', send_reset_mail)

router.post('/reset-password/:id/:token', reset_password)

module.exports = router