const Product = require("../models/product")




module.exports.getProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

module.exports.createProduct = async (req, res) => {
    const product = req.body
    console.log(req.files);
    console.log(product);
    const newProduct = new Product({
        title: ""
    })
}

module.exports.productProfie = async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id)
    res.json(product)
}