const express = require('express')
const { getBrands } = require('../controllers/brand')
const router = express.Router({mergeParams: true})

router.route('/')
.get(getBrands)

module.exports = router