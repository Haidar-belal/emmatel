'use strict';
const {
  Model
} = require('sequelize');
const employee = require('./employee');
module.exports = (sequelize, DataTypes) => {
  class EmployeePayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: "employee"
      });
      this.belongsTo(models.SalaryOrder, {
        foreignKey: 'salary_order_id',
        as: "salary_order"
      });
    }
  }
  EmployeePayment.init({
    amount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        require: true,
        isInt: true
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        require: true,
        inDate: {
          args: true,
          msg: 'date must by date'
        }
      }
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
        isAlpha: true
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
        isAlpha: true
      }
    },
  }, {
    sequelize,
    modelName: 'EmployeePayment',
    underscored: true
  });
  return EmployeePayment;
};