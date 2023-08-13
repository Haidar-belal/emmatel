'use strict';
const {
  Model
} = require('sequelize');
const accessory = require('./accessory');
module.exports = (sequelize, DataTypes) => {
  class AccessoryColor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Accessory, {
        foreignKey: 'accessory_id',
        as: 'accessory'
      });
      this.hasMany(models.AccessoryBranch, {
        foreignKey: 'accessory_color_id',
        as: 'accessory_branchs'
      });
      this.hasMany(models.AccessoryAppointment, {
        foreignKey: "accessory_color_id",
        as: "accessory_appointments"
      });
      this.hasMany(models.AccessoryExchange, {
        foreignKey: 'accessory_color_id',
        as: 'accessory_exchanges'
      });
    }
  }
  AccessoryColor.init({
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
        isAlpha: true
      }
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        require: true,
        isInt: true
      }
    },
  }, {
    sequelize,
    modelName: 'AccessoryColor',
    underscored: true
  });
  return AccessoryColor;
};