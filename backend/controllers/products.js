const  Products = require("../models/product")

module.exports.getProducts = async (req, res) => {
    const products = await Products.find()
    res.json(products)
}

module.exports.productProfie = async (req, res) => {
    const id = req.params.id
    const product = await Products.findById(id)
    res.json(product)
}