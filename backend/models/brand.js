const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    BrandName: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Brand', BrandSchema)