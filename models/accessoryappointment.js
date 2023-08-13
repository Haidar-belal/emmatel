'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessoryAppointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Accessory, {
        foreignKey: "accessory_id",
        as: "accessory"
      });
      this.belongsTo(models.AccessoryColor, {
        foreignKey: "accessory_color_id",
        as: "accessory_color"
      });
      this.belongsTo(models.Appointment, {
        foreignKey: "appointment_id",
        as: "appointment"
      });
    }
  }
  AccessoryAppointment.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        require: true,
        isInt: true
      }
    },
  }, {
    sequelize,
    modelName: 'AccessoryAppointment',
    underscored: true
  });
  return AccessoryAppointment;
};