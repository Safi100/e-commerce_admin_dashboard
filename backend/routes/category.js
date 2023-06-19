const express = require('express')
const { getCategories, newCategory } = require('../controllers/category')
const router = express.Router({mergeParams: true})

router.route('/')
.get(getCategories)
.post(newCategory)

module.exports = router