const  Products = require("../models/product")

module.exports.getProducts = async (req, res) => {
    const products = await Products.find()
    res.json(products)
}