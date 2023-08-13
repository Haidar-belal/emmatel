'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessoryBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Bill, {
        foreignKey: "bill_id",
        as: "bill"
      });
      this.belongsTo(models.Accessory, {
        foreignKey: "accessory_id",
        as: "accessory"
      });
    }
  }
  AccessoryBill.init({
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        require: true,
        isInt: true
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
    modelName: 'AccessoryBill',
    underscored: true
  });
  return AccessoryBill;
};