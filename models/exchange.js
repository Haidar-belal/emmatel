'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exchange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.CompanyBranch, {
        foreignKey: 'sender_branch_id',
        as: 'send_branch'
      });
      this.belongsTo(models.CompanyBranch, {
        foreignKey: 'receiver_branch_id',
        as: 'receiver_branch'
      });
      this.belongsTo(models.Employee, {
        foreignKey: 'receiver_employee_id',
        as: 'receiver_employee'
      });
      this.belongsTo(models.Employee, {
        foreignKey: 'sender_employee_id',
        as: 'sender_employee'
      });
      // this.belongsTo(models.Transporter, {
      //   foreignKey: 'transporter_id',
      //   as: 'transporter'
      // });
      this.belongsToMany(models.Accessory, {
        foreignKey: 'exchange_id',
        through: models.AccessoryExchange
      });
      this.belongsToMany(models.Device, {
        foreignKey: 'exchange_id',
        through: models.DeviceExchange
      });
    }
  }
  Exchange.init({
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    branch_accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Exchange',
    underscored: true
  });
  return Exchange;
};