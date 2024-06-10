const express = require('express')
const { login, fetchCurrentUser } = require('../controllers/auth')
const router = express.Router({mergeParams: true})
const { authenticateJWT } = require('../middleware')

router.post('/login', login)

router.get('/currentUser', authenticateJWT, fetchCurrentUser)

module.exports = router