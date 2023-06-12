const express = require('express')
const { renderLogin, login} = require('../controllers/auth')
const router = express.Router({mergeParams: true})

router.route('/')
.get(renderLogin)
.post(login)


module.exports = router