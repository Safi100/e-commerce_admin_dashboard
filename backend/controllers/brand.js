const Brand = require('../models/brand')

module.exports.getBrands = async (req, res) => {
    const brands = await Brand.find()
    res.send(brands)
}