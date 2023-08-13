'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Client, {
        foreignKey: "client_id",
        as: "client"
      });
      //   this.belongsTo(models.Offer, {
      //     foreignKey: "offer_id",
      //     as: "offer"
      // });
      this.belongsTo(models.Employee, {
        foreignKey: "employee_id",
        as: "employee"
      });
      this.hasMany(models.AccessoryBill, {
        foreignKey: "bill_id",
        as: "accessory_bills"
      });
      this.hasMany(models.DeviceBill, {
        foreignKey: "bill_id",
        as: "device_bills"
      });
      this.belongsTo(models.BranchSection, {
        foreignKey: "branch_section_id",
        as: "branch_section"
      });
    }
  }
  Bill.init({
    cost: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        require: true,
        isInt: true
      }
    },
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};