'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Employee, {
        foreignKey: "employee_id",
        as: "employee"
      });
      this.belongsTo(models.Client, {
        foreignKey: "client_id",
        as: "client"
      });
      this.belongsTo(models.CompanyBranch, {
        foreignKey: "company_branch_id",
        as: "company_branch"
      });
      this.hasMany(models.DeviceBill, {
        foreignKey: "appointment_id",
        as: "device_bills"
      });
      this.hasMany(models.Device, {
        foreignKey: "appointment_id",
        as: "devices"
      });
      this.belongsToMany(models.Accessory, {
        foreignKey: "appointment_id",
        through: models.AccessoryAppointment
      });
    }
  }
  Appointment.init({
    cash_payed: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        require: true,
        isInt: true
      }
    },
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};