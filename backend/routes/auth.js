const express = require('express')
const { login, fetchCurrentUser, logout } = require('../controllers/auth')
const router = express.Router({mergeParams: true})
const { authenticateJWT } = require('../middleware')

router.post('/login', login)

router.get('/currentUser', authenticateJWT, fetchCurrentUser)

router.post('/logout', logout)

module.exports = router