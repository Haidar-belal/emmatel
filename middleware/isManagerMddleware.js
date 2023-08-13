const { Manager } = require('../models');

const isManager = async (req, res, next) => {
    const manager = await Manager.findOne({
        where: {
            email: req.user.email
        }
    });
    if (!manager) {
        return res.status(403).json({ message: 'You do not have permission to access this resource.' })
    }
    console.log(manager);
    next();
};

module.exports = isManager;