const express = require('express')
const { getBrands, newBrand } = require('../controllers/brand')
const router = express.Router({mergeParams: true})

router.route('/')
.get(getBrands)
.post(newBrand)

module.exports = router