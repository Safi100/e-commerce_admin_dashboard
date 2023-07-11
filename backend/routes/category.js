const express = require('express')
const { getCategories, newCategory, getCategoryWithCount } = require('../controllers/category')
const multer = require('multer')
const { storage } = require('../cloudinary') 
const upload = multer({storage})
const router = express.Router({mergeParams: true})

router.route('/')
.get(getCategories)
.post(upload.single('categoryImage'), newCategory)

router.route('/getCategoryWithCount')
.get(getCategoryWithCount)
module.exports = router