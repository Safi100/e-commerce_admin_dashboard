const express = require('express')
const { getAdvertisement, newAdvertisements, deleteAdvertisements} = require('../controllers/advertisement')
const router = express.Router({mergeParams: true})
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({storage})

router.route('/')
.get(getAdvertisement)
.post(upload.single('advertisementImage'), newAdvertisements)

router.route('/delete')
.post(deleteAdvertisements)

module.exports = router