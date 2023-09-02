const Review = require('../models/review')
module.exports.GetReviews = async (req, res) => {
    var review
    const {orderBy, category} = req.query
    switch (orderBy) {
        case "newest":
            review = await Review.find().populate('author').populate({path: 'product', populate: [{ path: 'category' },{ path: 'brand' }]}).sort({createdAt: -1})
        break;
        case "top":
            review = await Review.find().populate('author').populate({path: 'product', populate: [{ path: 'category' },{ path: 'brand' }]}).sort({rating: -1})
        break;
        case "lowest":
            review = await Review.find().populate('author').populate({path: 'product', populate: [{ path: 'category' },{ path: 'brand' }]}).sort({rating: 1})
        break;
    
        default:
            review = await Review.find().populate('author').populate({path: 'product', populate: [{ path: 'category' },{ path: 'brand' }]})
            break;
        }
        if(category !==""){
            const filteredDocumentsByCategory = review.filter(doc => doc.product.category.CategoryName === `${category}`);
            res.json(filteredDocumentsByCategory)
        }else{
            res.json(review)
        }
}

