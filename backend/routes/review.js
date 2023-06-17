const express = require('express')
const { GetReviews } = require('../controllers/review')
const router = express.Router({mergeParams: true})

router.route('/')
.get(GetReviews)

module.exports = router