const express = require('express')
const { customerProfile, getCustomers } = require('../controllers/customers')
const router = express.Router({mergeParams: true})

router.get('/fetch-customers', getCustomers)

router.get('/:id', customerProfile)

module.exports = router