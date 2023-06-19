const Category = require('../models/category')

module.exports.getCategories = async (req, res) => {
    const categories = await Category.find()
    res.send(categories)
}

module.exports.newCategory = async (req, res) => {
    try{
        const { category } = req.body
        const newCategory = new Category({
            CategoryName: category.toLowerCase()
        })
        await newCategory.save()
        res.json(newCategory)
    }catch(err){
        return res.status(400).json(JSON.stringify(err.message))
    }
}