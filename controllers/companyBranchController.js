const { CompanyBranch } = require('../models');

exports.getAllCompanyBranch = async (req, res, next) => {
    try {
        const companyBranchs = await CompanyBranch.findAll({
            where: {
                manager_id: req.user.id
            },
            include: 'branch_sections'
        });
        return res.status(200).json(companyBranchs);
    } catch (error) {
        return res.status(500).json(error.message)
    }
};