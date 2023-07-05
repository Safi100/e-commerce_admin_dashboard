const express = require('express')
const { getProducts, productProfie, createProduct, updateProduct, deleteImages } = require('../controllers/products')
const router = express.Router({mergeParams: true})
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({storage})

router.route('/')
.get(getProducts)
.post(upload.array('img', 4), createProduct)

router.route('/:id')
.get(productProfie)
.put(upload.array('img', 4), updateProduct)

router.route('/:id/deleteImages')
.put(deleteImages)

module.exports = router