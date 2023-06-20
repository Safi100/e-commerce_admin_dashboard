const Products = require("../models/product")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })

module.exports.getProducts = async (req, res) => {
    const products = await Products.find()
    res.json(products)
}

module.exports.createProduct = async (req, res) => {
    
}

module.exports.productProfie = async (req, res) => {
    const id = req.params.id
    const product = await Products.findById(id)
    res.json(product)
}