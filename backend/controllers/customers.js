const customer = require("../models/customer");

module.exports.getCustomers = async (req, res) => {
    const customers = await customer.find()
    res.json(customers)
}