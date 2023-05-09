const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_JWT_SECRET);
        // Verify token done successfully => proceed to next middleware
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Invalid token.' });
    }
}

module.exports = verifyToken;