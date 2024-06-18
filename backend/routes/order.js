const express = require('express')
const { fetchOrders } = require('../controllers/order')
const router = express.Router({mergeParams: true})

router.get('/', fetchOrders)

module.exports = router