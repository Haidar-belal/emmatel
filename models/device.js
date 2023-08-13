'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.CompanyBranch, {
        foreignKey: 'company_branch_id',
        as: 'company_branch'
      });
      this.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });
      this.belongsTo(models.Appointment, {
        foreignKey: 'appointment_id',
        as: 'appointment'
      });
      this.belongsToMany(models.Exchange, {
        foreignKey: 'device_id',
        through: models.DeviceExchange
      });
    }
  }
  Device.init({
    imei: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'IMEI already in use!'
      },
      validate: {
        require: true,
        isAlpha: true
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
        isAlpha: true
      }
    },
  }, {
    sequelize,
    modelName: 'Device',
    underscored: true
  });
  return Device;
};