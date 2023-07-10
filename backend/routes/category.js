const express = require('express')
const { getCategories, newCategory } = require('../controllers/category')
const multer = require('multer')
const { storage } = require('../cloudinary') 
const upload = multer({storage})
const router = express.Router({mergeParams: true})

router.route('/')
.get(getCategories)
.post(upload.single('categoryImage'), newCategory)

module.exports = router