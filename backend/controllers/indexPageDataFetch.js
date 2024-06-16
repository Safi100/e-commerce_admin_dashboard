const customer = require("../models/customer");
const product = require('../models/product')
const Order = require('../models/order')
module.exports.getIndexData = async (req, res) => {
    // customer count
    const CustomerCount = await customer.countDocuments()
    // new customers - week ago
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const NewCustomers = await customer.find({createdAt: { $gte: oneWeekAgo }}).limit(10).select(['createdAt', 'email', 'first_name', 'last_name'])
    // products count
    const productsCount = await product.countDocuments()
    // orders count
    const ordersCount = await Order.countDocuments()
    // latest orders
    let latestOrders = await Order.find().sort({createdAt: -1}).limit(5).populate('customer', ['email', 'first_name', 'last_name'])
    latestOrders = latestOrders.map(order => {
        const totalPrice = order.items.reduce((total, item) => total + (item.quantity * item.price_when_order), 0)
        return {
            ...order._doc,
            totalPrice
        }
    });
    // orders cost count each month for chart
    const orders = await Order.aggregate([
        {
            $unwind: "$items"
        },
        {
            $group: {
                _id: {
                year: { $year: "$createdAt" }, 
                month: { $month: "$createdAt" } 
                },
                totalCost: {
                    $sum: { 
                        $multiply: ["$items.price_when_order", "$items.quantity"] 
                    }
                }
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1 }
        }
    ]);
    // sales cost for all orders
    let total_sales = 0;
    const sales_orders = await Order.find()
    sales_orders.forEach(order => {
        let totalPrice = 0;
        order.items.forEach(item => {
            totalPrice += item.quantity * item.price_when_order;
        });
        total_sales += totalPrice
    });
    return res.json({CustomerCount, NewCustomers, productsCount, ordersCount, latestOrders, orders, total_sales})
}