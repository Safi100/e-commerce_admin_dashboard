const express = require('express')
const { getBrands, newBrand, getBrandWithCount } = require('../controllers/brand')
const router = express.Router({mergeParams: true})

router.route('/')
.get(getBrands)
.post(newBrand)

router.route('/getBrandWithCount')
.get(getBrandWithCount)

module.exports = router