const { Bill, Category, AccessoryBill, DeviceBill } = require('../models');
const Sequelize = require('sequelize');

exports.getOneBill = async (req, res, next) => {
    const { id } = req.params;
    try {
        const bill = await Bill.findOne({
            where: {
                id: id
            },
            include: ["accessory_bills", "device_bills"]
        });
        if (!bill) {
            return res.status(404).json({ message: "bill not found" });
        }
        return res.status(200).json(bill);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.getAllBills = async (req, res, next) => {
    try {
        const bill = await Bill.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('Bill.cost')), 'cost'],
                [Sequelize.fn('COUNT', Sequelize.col('Bill.id')), 'numBills'],
                [Sequelize.fn('COUNT', Sequelize.col('device_bills.id')), 'numDevices'],
                [Sequelize.fn('COUNT', Sequelize.col('accessory_bills.id')), 'numAccessories'],
                [Sequelize.fn('MONTH', Sequelize.col('Bill.createdAt')), 'month']
            ],
            include: [
                {
                    model: AccessoryBill,
                    as: 'accessory_bills',
                    attributes: []
                },
                {
                    model: DeviceBill,
                    as: 'device_bills',
                    attributes: []
                },
            ],
            group: [Sequelize.fn('MONTH', Sequelize.col('bill.createdAt'))],
        });
        return res.status(200).json(bill);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};