const Brand = require('../models/brand')
const Product = require('../models/product')
module.exports.getBrands = async (req, res) => {
    const brands = await Brand.find()
    res.send(brands)
}
module.exports.getBrandWithCount = async(req, res) => {
    const brands = await Brand.find().populate('products')
    brands.sort((a, b) => b.products.length - a.products.length);
    res.json(brands);
}
module.exports.newBrand = async (req, res) => {
    try{
        const { brand } = req.body
        const newBrand = new Brand({
            BrandName: brand.toLowerCase()
        })
        await newBrand.save()
        res.json(newBrand)
    }catch(err){
        return res.status(400).json(JSON.stringify(err.message))
    }
}