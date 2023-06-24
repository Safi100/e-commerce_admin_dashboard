const express = require('express')
const { getProducts, productProfie, createProduct } = require('../controllers/products')
const router = express.Router({mergeParams: true})
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({storage})

router.route('/')
.get(getProducts)
.post(upload.array('img', 4), createProduct)

router.route('/:id')
.get(productProfie)


module.exports = router