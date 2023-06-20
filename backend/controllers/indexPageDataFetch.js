const customer = require("../models/customer");
const product = require('../models/product')
module.exports.getIndexData = async (req, res) => {
    // customer count
    const CustomerCount = await customer.countDocuments()
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // new customers
    const NewCustomers = await customer.find({createdAt: {$gte: today}}).limit(10)
    const productsCount = await product.countDocuments()
    // todo : latest orders
    return res.json([CustomerCount, NewCustomers, productsCount])
}