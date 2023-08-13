const { Employee, CompanyBranch, Manager, BranchSection, Transaction, Bill, AccessoryBill, DeviceBill } = require('../models');
const { createEmployeeAndTransaction, updateForEmployee, updateForManager, changePassword, checkIfEmployeeExistsUsingCode } = require('../helpers/employeeHelper');
const { getValidationErrors, checkIsPasswordMatch, generateToken, checkIfManagerExists, checkIfEmployeeExists, createTransport, resetPassword } = require('../helpers/publicHelper');
const Sequelize = require('sequelize');

//* Endpoint for getting the employee of a manager
exports.getAllEmployeesForOneManager = async (req, res, next) => {
    try {
        const employees = await Employee.findAll({
            where: {
                manager_id: req.user.id,
                deleted_at: null
            },
            include: ["job_title",
                {
                    model: Transaction,
                    as: 'transactions',
                    attributes: ["id"],
                    where: {
                        archived: true
                    },
                    include: [
                        {
                            model: BranchSection,
                            as: 'branch_section',
                            attributes: ["id", "name"],
                            include: [{
                                model: CompanyBranch,
                                as: 'company_branch',
                                attributes: ["id", "name"],
                            }]
                        }
                    ]
                }],
            order: [['id', 'DESC']],
        });
        return res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

//* Endpoint for signing up
exports.addEmployee = async (req, res, next) => {
    try {
        const managerExists = await checkIfManagerExists(req.body.email);

        if (managerExists) {
            return res.status(400).json({ error: "Email already exist" });
        }

        const { employee, transaction } = await createEmployeeAndTransaction(req.body);

        res.status(200).json({ message: "Signup successful", data: { employee, transaction } });
    } catch (error) {
        const validationErrors = getValidationErrors(error);
        res.status(500).json({ error: validationErrors || error });
    }
};

//* endpoint for deleting employee
exports.deleteEmployee = async (req, res, next) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            res.status(404).json({ message: "employee not found" });
        }
        employee.deleted_at = Date.now();
        employee.save();
        res.status(200).json({ message: "employee deleted successfully" });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

//* endpoint for updating employee
exports.updateEmployee = async (req, res, next) => {
    let employee;
    try {
        const managerExists = await checkIfManagerExists(req.bode.email);
        if (managerExists) {
            return res.status(400).json({ error: "Email already exist" })
        }
        const isManager = await Manager.findByPk(req.user.id);
        if (!isManager) {
            employee = await updateForEmployee(req.bode);
        } else {
            employee = await updateForManager(req.body);
        }
        res.status(200).json({ message: "employee updated successfully" });
    } catch (error) {
        const validationErrors = getValidationErrors(error);
        res.status(500).json({ error: validationErrors || error });
    }
};

//* endpoint for getting one employee
exports.getOneEmployee = async (req, res, next) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findOne({
            where: {
                id: id
            },
            include: [{
                model: Bill,
                as: 'bills',
                attributes: [
                    [Sequelize.fn("COALESCE", Sequelize.fn('COUNT', Sequelize.col('bills.id')), 0), 'num_bills'],
                ],
                include: [
                    {
                        model: AccessoryBill,
                        as: 'accessory_bills',
                        attributes: [
                            [Sequelize.fn("COALESCE", Sequelize.fn('COUNT', Sequelize.col('bills->accessory_bills.id')), 0), 'num_accessory'],
                        ]
                    },
                    {
                        model: DeviceBill,
                        as: 'device_bills',
                        attributes: [
                            [Sequelize.fn("COALESCE", Sequelize.fn('COUNT', Sequelize.col('bills->device_bills.id')), 0), 'num_device'],
                        ]
                    },
                ]
            }, {
                model: Transaction,
                as: 'transactions',
                attributes: {
                    include: [
                        [Sequelize.fn("COALESCE", Sequelize.fn('COUNT', Sequelize.col('transactions.id')), 0), 'num_transactions'],
                    ]
                }
            }]
        });
        if (employee.id === null) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        console.log(employee);
        return res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

//* Endpoint for change password
exports.changePassword = async (req, res, next) => {
    const { new_password, old_password } = req.body;
    try {
        const isPasswordMatch = await checkIsPasswordMatch(old_password, req.user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }
        const employee = await changePassword(new_password, req.user.id);
        const token = generateToken(employee);
        return res.status(200).json({ token: token, user: employee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//* Endpoint for forget password
exports.forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const employee = await checkIfEmployeeExists(email);
        if (!employee) {
            return res.status(404).json({ error: 'No user found with that email address' });
        }
        const code = crypto.randomBytes(3).toString('hex');
        employee.reset_password = code;
        await employee.save();
        const info = createTransport(employee.email, code);
        return res.status(200).json({ massage: 'Password reset code sent to your email' });
    } catch (error) {
        return res.status(500).json({ error: error.massage });
    }
};

//* Endpoint for reset password
exports.resetPassword = async (req, res, next) => {
    const { code, new_password } = req.body;
    try {
        const employee = await checkIfEmployeeExistsUsingCode(code);
        if (!employee) {
            return res.status(404).json({ error: 'Invalid or expired password reset code' });
        }
        const newEmployee = await resetPassword(employee, new_password)
        const token = generateToken(newEmployee);
        return res.status(200).json({
            token: token,
            user: employee
        });
    } catch (error) {
        return res.status(500).json({ error: error.massage });
    }
};










//todo Endpoint for getting the employee of a manager
// exports.getAllEmployeesForOneManager = async (req, res, next) => {
//     try {
//         const employees = await Employee.findAll({
//             where: {
//                 manager_id: req.user.id,
//             },
//             include: ["job_title",
//             {
//                 model: BranchSection,
//                 as: 'branch_sections',
//                 through: {
//                     model: Transaction,
//                     as: 'transactions',
//                     attributes: [],
//                 },
//                 include: [{
//                     model: CompanyBranch,
//                     as: 'company_branche',
//                 }]
//             }],
//             order: [[Sequelize.literal('`branch_sections->transactions`.`id`'), 'DESC']],
//         });
//         return res.status(200).json(employees);
//     } catch (error) {
//         return res.status(500).json(error.message);
//     }
// };