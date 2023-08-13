'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accessory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: "category"
      });
      this.hasMany(models.AccessoryColor, {
        foreignKey: 'accessory_id',
        as: 'accessory_colors'
      });
      this.belongsToMany(models.CompanyBranch, {
        foreignKey: 'accessory_id',
        through: models.AccessoryBranch
      });
      this.belongsToMany(models.PriceEdition, {
        foreignKey: 'accessory_id',
        through: models.AccessoryPriceEdition
      });
      this.hasMany(models.AccessoryBill, {
        foreignKey: "accessory_id",
        as: "accessory_bills"
      });
      this.belongsToMany(models.Target, {
        foreignKey: 'accessory_id',
        through: models.AccessoryTarget
      });
      this.belongsToMany(models.Exchange, {
        foreignKey: 'accessory_id',
        through: models.AccessoryExchange
      });
      this.belongsToMany(models.Appointment, {
        foreignKey: "accessory_id",
        through: models.AccessoryAppointment
      });
    }
  }
  Accessory.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
        isAlpha: true
      }
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        require: true,
        isInt: true
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
    modelName: 'Accessory',
  });
  return Accessory;
};