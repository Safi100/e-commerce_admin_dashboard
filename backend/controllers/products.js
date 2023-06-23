const Product = require("../models/product")




module.exports.getProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

module.exports.createProduct = async (req, res) => {
    const product = req.body
    const newProduct = new Product({
        title: product.title,
        price: product.price,
        discount: product.discount,
        description: product.description,
        chose_for_you: product.chose_for_you,
        still_available: product.still_available,
        category: product.category,
        brand: product.brand,
        images: req.files.map(file => ({url: file.path, filename: file.filename}))
    })
    await newProduct.save()
    res.send(newProduct)
}

module.exports.productProfie = async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id)
    res.json(product)
}