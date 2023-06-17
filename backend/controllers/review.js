const Review = require('../models/review')
module.exports.GetReviews = async (req, res) => {
    var review
    const {orderBy} = req.query
    console.log(JSON.stringify(orderBy));
    switch (orderBy) {
        case "newest":
            console.log("this");
            review = await Review.find({}).sort({createdAt: -1})
        break;
        case "top":
            review = await Review.find({}).sort({rating: -1})
        break;
        case "lowest":
            review = await Review.find({}).sort({rating: 1})
        break;
    
        default:
            review = await Review.find({}).populate('author').populate('product')
        break;
    }
    res.json(review)
}

