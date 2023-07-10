const Category = require('../models/category')

module.exports.getCategories = async (req, res) => {
    const categories = await Category.find()
    res.send(categories)
}

module.exports.newCategory = async (req, res) => {
    try{
        const { categoryName } = req.body
        const newCategory = new Category({
            CategoryName: categoryName.toLowerCase(),
            categoryImage:{
                url: req.file.path,
                filename: req.file.filename
            }
        })
        await newCategory.save()
        res.json(newCategory)
    }catch(err){
        return res.status(400).json(JSON.stringify(err.message))
    }
}