const jwt = require('jsonwebtoken')

module.exports.authenticateJWT = (req, res, next) => {
    const secret_key = process.env.SECRET_KEY
    const token = req.headers.authorization || req.cookies.accessToken;
    if (!token) return res.status(401).send('You must log in to access this');
    jwt.verify(token, secret_key, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token is not valid!' });
        req.user = user;
        next();
    });
}