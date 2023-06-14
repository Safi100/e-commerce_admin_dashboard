module.exports.isLoggedIn = (req, res, next) => {
    if(req.session.user){
        return next()
    }
    console.log("please log in");
    res.json(null)
}