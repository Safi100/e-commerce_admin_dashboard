const Product = require("../models/product")
const {cloudinary} = require('../cloudinary/index')
const brand = require("../models/brand")
const category = require('../models/category')

module.exports.getProducts = async (req, res) => {
    const { orderBy, category, brand, title } = req.query;

    let query = {};

    if (category) {
      const categoryIds = category.split(",");
      query.category = { $in: categoryIds };
    }

    if (brand) {
      const brandIds = brand.split(",");
      query.brand = { $in: brandIds };
    }

    if (title) {
        const titleName = title;    
        const regex = new RegExp(titleName, "i");
        query.title = regex;
      }

    let products;

    switch(orderBy){
        case "price_low":
            // products = await Product.find().sort({priceToPay: 1}).populate('reviews')
            products = await Product.find(query).sort({priceToPay: 1}).populate('reviews');      
        break;
        case "price_high":
            // products = await Product.find().sort({priceToPay: -1}).populate('reviews')
            products = await Product.find(query).sort({priceToPay: -1}).populate('reviews');      
        break;
        case "newest":
            // products = await Product.find().sort({createdAt: -1}).populate('reviews')
            products = await Product.find(query).sort({createdAt: -1}).populate('reviews');      
        break;
        case "avg_rating":
            // todo: todo later after modify rating...
            // products = await Product.find().populate('reviews')
            products = await Product.find(query).populate('reviews');      
        break;
        default:
            products = await Product.find(query).populate('reviews');      
        break;
    }
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
    const ProductID = newProduct._id;
    const Brand = await brand.findByIdAndUpdate(product.brand)
    const Category = await category.findByIdAndUpdate(product.category)
    Category.products.push(ProductID)
    Brand.products.push(ProductID)

    await Brand.save()
    await Category.save()
    await newProduct.save()

    res.send(newProduct)
}
module.exports.updateProduct = async (req, res) => {
    try{
        const id = req.params.id
        const product = req.body
        const UpdatedProduct = await Product.findByIdAndUpdate(id, {
            title: product.title,
            price: product.price,
            discount: product.discount,
            description: product.description,
            chose_for_you: product.chose_for_you,
            still_available: product.still_available,
            category: product.category,
            brand: product.brand,
        })
        UpdatedProduct.priceToPay = product.price - (product.discount / 100) * product.price;
        const imgs = req.files.map(file => ({url: file.path, filename: file.filename}))
        UpdatedProduct.images.push(...imgs)
        
        console.log(UpdatedProduct);
        if(UpdatedProduct.images.length > 4){
            return res.status(409).json("You can't have more than 4 images")
        }
        await UpdatedProduct.save()
        res.status(200).json(UpdatedProduct)
    }catch(e){
        return res.status(409).json(e)
    }
}
module.exports.productProfie = async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id).populate('reviews').populate('category').populate('brand')
    if(!product){
        return res.status(404).json("Product not found")
    }
    res.json(product)
}
module.exports.deleteImages =  async (req, res) => {
    try{
        const id = req.params.id
        const product = await Product.findByIdAndUpdate(id)
        if(req.body.images){
            for(let filename of req.body.images){
                console.log(filename);
                await cloudinary.uploader.destroy(filename)
            }
            await product.updateOne({$pull: {images: { filename: { $in : req.body.images } } } } )
            await product.save()
            res.status(200).json(product.images)
        }
    }catch(e){
        console.log(e);
    }
}