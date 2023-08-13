const { Transaction, sequelize } = require('../models');
const axios = require('axios');


exports.addTransaction = async (req, res, next) => {
    const { employee_id, branch_section_id, date_at } = req.body;
    try {
        await sequelize.transaction(async (t) => {

            const { data } = await axios.put(`http://localhost:3000/transactions/${employee_id}/employee`);

            const transaction = await Transaction.create({
                employee_id: employee_id,
                branch_section_id: branch_section_id,
                archived: true,
                date_at: date_at,
            }, { transaction: t });

            return res.status(200).json(transaction);
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.updateTransaction = async (req, res, next) => {
    const { id } = req.params;
    try {
        const lastTransaction = await Transaction.findOne({
            where: {
                employee_id: id
            },
            order: [["id", "DESC"]]
        });
        lastTransaction.archived = false;
        lastTransaction.save();
        return res.status(200).json(lastTransaction);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};