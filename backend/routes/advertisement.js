const express = require('express')
const { getAdvertisement, newAdvertisements} = require('../controllers/advertisement')
const router = express.Router({mergeParams: true})

router.route('/')
.get(getAdvertisement)
.post(upload.single('categoryImage'), newAdvertisements)