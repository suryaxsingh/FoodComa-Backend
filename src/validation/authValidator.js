const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverconfig');

async function isLoggedIn(req, res, next) {
    const token = req.cookies["authToken"];
    if(!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No Auth Token Provided"
        });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if(!decoded) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "Invalid Token Provided"
        });
    }

    // If reached here, then user is authenticated allow then to access the api

    req.user = {
        email: decoded.email,
        id: decoded.id
    }

    next();
}

module.exports = {
    isLoggedIn
}