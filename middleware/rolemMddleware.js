const jwt = require("jsonwebtoken");
require('dotenv').config();


const checkRole = (roles) => {
    return (req, res, next) => {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userRole = req.user = decoded;
        if (!roles.includes(userRole)) {
            return res.status(401).json({ error: "You do not have permission to access this resource." });
        }
        next();
    };
};

module.exports = checkRole;