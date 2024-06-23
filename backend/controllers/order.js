const Order = require('../models/order')

module.exports.fetchOrders = async (req, res) => {
    try{
        let orders = await Order.find().populate({ path: 'customer', select: ['first_name', 'last_name', 'email'] })
        .populate({path:'items.product', select: ['title', 'images']});
        orders = orders.map(order => {
            let totalPrice = 0;
            order.items.forEach(item => {
                totalPrice += item.quantity * item.price_when_order;
            });
            order = order.toObject();
            order.totalPrice = totalPrice;
            return order;
        });


        switch(req.query.orderBy){
            case 'newest_orders' : 
                orders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
            case 'highest_price' :
                orders = orders.sort((a, b) => b.totalPrice - a.totalPrice);
            break;
            case 'lowest_price':
                orders = orders.sort((a, b) => a.totalPrice - b.totalPrice);
            break;
            default:
            break;
        }
        res.json(orders);
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}