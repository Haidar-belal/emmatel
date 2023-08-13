const { Manager } = require('../models');
const { hashPassword } = require('./publicHelper');

exports.addManager = async (request) => {
    try {
        const hashedPassword = await hashPassword(request.password);
        const manager = await Manager.create({
            first_name: request.first_name,
            last_name: request.last_name,
            card_id: request.card_id,
            email: request.email,
            password: hashedPassword,
            phone: request.phone,
            city: request.city,
            region: request.region,
            street: request.street,
            near_by: request.near_by,
            manager_id: request.manager_id,
            job_title_id: request.job_title,
        });
    } catch (error) {

    }
};


exports.checkIfManagerExistsUsingCode = async (code) => {
    try {
        const manager = await Manager.findOne({
            where: {
                reset_password: code,
            },
            include: 'job_title'
        });
        return !!manager;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.changePassword = async (password, id) => {
    try {
        const hashedPassword = await hashPassword(password);
        const manager = await Manager.findByPk(id, {
            include: 'job_title'
        });
        manager.password = hashedPassword;
        await manager.save();
        return manager;
    } catch (error) {
        throw error;
    }
};