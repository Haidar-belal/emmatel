const { Employee, Transaction, Manager, sequelize } = require('../models');
const { hashPassword } = require('./publicHelper');


exports.createEmployeeAndTransaction = async (request) => {
    try {
        const hashedPassword = await hashPassword(request.password);

        const { employee, transaction } = await sequelize.transaction(async (t) => {
            const employee = await Employee.create(
                {
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
                    date_at: request.date_at,
                },
                { transaction: t },
            );

            const transaction = await Transaction.create(
                {
                    employee_id: employee.id,
                    branch_section_id: request.branch_section_id,
                    archived: true,
                    date_at: request.date_at,
                },
                { transaction: t },
            );

            return { employee, transaction };
        });

        return { employee, transaction };
    } catch (error) {
        // Handle any errors that occur during the transaction
        console.error(error);
        throw error;
    }
};

exports.checkIfEmployeeExistsUsingCode = async (code) => {
    try {
        const employee = await Employee.findOne({
            where: {
                reset_password: code,
            },
            include: 'job_title'
        });
        return !!employee;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.updateForEmployee = async ({ password, first_name, last_name, card_id, email, phone, city, region, street, near_by }) => {
    try {
        const hashedPassword = await hashPassword(password);
        const employee = await Employee.update({
            first_name: first_name,
            last_name: last_name,
            card_id: card_id,
            email: email,
            password: hashedPassword,
            phone: phone,
            city: city,
            region: region,
            street: street,
            near_by: near_by,
        });
        return employee
    } catch (error) {
        throw error;
    }
};

exports.updateForManager = async ({ first_name, last_name, card_id, email, phone, city, region, street, near_by, manager_id }) => {
    try {
        const employee = await Employee.update({
            first_name: first_name,
            last_name: last_name,
            card_id: card_id,
            email: email,
            manager_id: manager_id,
            phone: phone,
            city: city,
            region: region,
            street: street,
            near_by: near_by,
        });
        return employee
    } catch (error) {
        throw error;
    }
};

exports.changePassword = async (password, id) => {
    try {
        const hashedPassword = await hashPassword(password);
        const employee = await Employee.findByPk(id, {
            include: 'job_title'
        });
        employee.password = hashedPassword;
        await employee.save();
        return employee;
    } catch (error) {
        throw error;
    }
};

