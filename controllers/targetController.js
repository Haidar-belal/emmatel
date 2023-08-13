const { Target, AccessoryTarget, Accessory, DeviceTarget, Category, TargetLevel } = require('../models');

exports.getAllTarget = async (req, res, next) => {
    try {
        const targets = await Target.findAll({
            include: [{
                model: Accessory,
                attributes: ["id"],
                through: {
                    model: AccessoryTarget,
                    // include: [TargetLevel],
                }
            },
            {
                model: Category,
                attributes: ["id"],
                through: {
                    model: DeviceTarget
                }
            }],
        });
        return res.status(200).json(targets);
    } catch (error) {
        return res.status(500).json(error.message)
    }
};