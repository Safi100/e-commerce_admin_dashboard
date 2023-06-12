const customer = require("../models/customer");

module.exports = async (req, res) => {
    // customer count
    const CustomerCount = await customer.countDocuments()
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // new customers
    const NewCustomers = await customer.find({createdAt: {$gte: today}})
    // todo : latest orders
    res.render("index", {title: "Dashboard", CustomerCount, NewCustomers})
}