const Product = require("../models/product")

module.exports.getProducts = async (req, res) => {
    var products
    const {orderBy, category} = req.query
    switch(orderBy){
        case "price_low":
            products = await Product.find().sort({priceToPay: 1}).populate('reviews')
        break;
        case "price_high":
            products = await Product.find().sort({priceToPay: -1}).populate('reviews')
        break;
        case "newest":
            products = await Product.find().sort({createdAt: -1}).populate('reviews')
        break;
        case "avg_rating":
            // todo: todo later after modify rating...
            products = await Product.find().populate('reviews')
        break;
        default:
            products = await Product.find().populate('reviews')        
        break;
    }
    if(category !==""){
        const filteredDocumentsByCategory = products.filter(doc => doc.product.category.CategoryName === `${category}`);
        res.json(filteredDocumentsByCategory)
    }else{
        res.json(products)
    }
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