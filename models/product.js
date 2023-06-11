const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    discount:{
        type: Number,
        min: 0,
        max: 99,
        default: 0
    },
    images:[
        {
            type: String,
            default: ""
        }
    ],
    chose_for_you:{
        type: Boolean,
        default: false
    },
    still_available:{
        type: Boolean,
        default: false
    },
    category:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

module.exports = mongoose.model('Product', ProductSchema)