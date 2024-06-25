const Customer = require("../models/customer");
const Order = require("../models/order");
const mongoose = require("mongoose");

module.exports.getCustomers = async (req, res) => {
    try{
        let customers = await Customer.find()
        for (let i = 0; i < customers.length; i++) {
            const orderCount = await Order.countDocuments({ customer: customers[i]._id });
            customers[i] = customers[i].toObject();
            customers[i].orderCount = orderCount;
        }
        res.json(customers);
    }catch(e){
        console.log(e);
        res.status(500).send(e)
    }
}
module.exports.customerProfile = async (req, res) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw new Error("Invalid id");
        const customer = await Customer.findById(req.params.id).select(['-password'])
        .populate({path: 'reviews', populate: {path: 'product', populate: ['brand', 'category']}})
        if(!customer) throw new Error("Customer not found");

        let orders = await Order.find({customer: customer._id}).populate({path:'items.product', select: ['title', 'images']});
        orders = orders.map(order => {
            let totalPrice = 0;
            order.items.forEach(item => {
                totalPrice += item.quantity * item.price_when_order;
            });
            order = order.toObject();
            order.totalPrice = totalPrice;
            return order;
        });
        res.json({customer, orders});
    }catch(e){
        console.log(e);
        res.status(500).send({message: e.message})
    }
}