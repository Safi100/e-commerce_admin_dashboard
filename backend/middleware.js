const jwt = require('jsonwebtoken')

module.exports.authenticateJWT = (req, res, next) => {
    const AuthHeader = req.headers.authorization
    console.log(req.headers);
    const secret_key = process.env.SECRET_KEY
    if(AuthHeader){
        const token = AuthHeader.split(" ")[1]
        jwt.verify(token, secret_key, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Token is not valid!' });
            }
            req.user = user;
            next();
        });
    }else{
        return res.status(401).json({ error: 'Unauthorized' });
    }

}