const express = require('express')
const { getProducts, productProfie } = require('../controllers/products')
const router = express.Router({mergeParams: true})

router.route('/')
.get(getProducts)

router.route('/:id')
.get(productProfie)


module.exports = router