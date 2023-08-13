'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalaryOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'employee'
      });
      this.hasMany(models.EmployeePayment, {
        foreignKey: 'salary_order_id',
        as: 'employee_payments'
      });
    }
  }
  SalaryOrder.init({
    amount: {
      type: DataTypes.DOUBLE.UNSIGNED,
      allowNull: false,
      validate: {
        require: {
          args: true,
          msg: 'amount in require'
        }
      }
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    rest_amount: {
      type: DataTypes.DOUBLE.UNSIGNED,
      allowNull: false,
      validate: {
        require: {
          args: true,
          msg: "rest amount is require"
        }
      }
    },
    payed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "0"
    },
  }, {
    sequelize,
    modelName: 'SalaryOrder',
    underscored: true
  });
  return SalaryOrder;
};