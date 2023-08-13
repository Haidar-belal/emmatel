'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Manager, {
                foreignKey: 'manager_id',
                as: 'manager'
            });
            this.belongsTo(models.JobTitle, {
                foreignKey: 'job_title_id',
                as: 'job_title'
            });
            this.hasMany(models.AbsenceOrder, {
                foreignKey: 'employee_id',
                as: 'absence_orders'
            });
            this.hasMany(models.EmployeePayment, {
                foreignKey: 'employee_id',
                as: 'employee_payments'
            });
            // this.belongsToMany(models.BranchSection, {
            //     foreignKey: "employee_id",
            //     through: models.Transaction,
            //     as: "branch_sections"
            // });
            this.hasMany(models.Bill, {
                foreignKey: "employee_id",
                as: "bills"
            });
            this.hasMany(models.Appointment, {
                foreignKey: "employee_id",
                as: "appointments"
            });
            this.hasMany(models.Exchange, {
                foreignKey: 'receiver_employee_id',
                as: 'receive_exchanges'
            });
            this.hasMany(models.Exchange, {
                foreignKey: 'sender_employee_id',
                as: 'send_exchanges'
            });
            this.hasMany(models.Transaction, {
                foreignKey: 'employee_id',
                as: 'transactions'
            })
        }
    }
    Employee.init({
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "First Name cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "First Name must be between 2 and 50 characters long",
                },
            },
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Last Name cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "Last Name must be between 2 and 50 characters long",
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Invalid email address",
                },
                notEmpty: {
                    args: true,
                    msg: "Email cannot be empty",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Password cannot be empty",
                },
                len: {
                    args: [8, 100],
                    msg: "Password must be between 8 and 100 characters long",
                },
                isStrongPassword: function(value) {
                    if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                    throw new Error("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character");
                    }
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Phone number cannot be empty",
                },
                isValidPhoneNumber: function (value) {
                    if (!value.match(/^09\d{8}$/)) {
                        throw new Error("Phone number must start with '09' and have exactly 10 digits");
                    }
                },
            },
        },
        card_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Email cannot be empty",
                },
            },
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "City cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "City must be between 2 and 50 characters long",
                },
            },
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Region cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "Region must be between 2 and 50 characters long",
                },
            },
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Street cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "Street must be between 2 and 50 characters long",
                },
            },
        },
        near_by: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Name cannot be empty",
                },
                len: {
                    args: [2, 50],
                    msg: "Name must be between 2 and 50 characters long",
                },
            },
        },
        deserve: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: '0'
        },
        reset_password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deleted_at: {
            type: DataTypes.DATE,
            defaultValue: null,
            allowNull: true,
        },
        date_at: {
            type: DataTypes.DATE,
            allowNull: false,
            require: true
        }
    },
        {
            sequelize,
            modelName: 'Employee',
            underscored: true
        });
    return Employee;
};