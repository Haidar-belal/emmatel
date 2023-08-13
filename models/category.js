'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Category, {
        foreignKey: "category_id",
        as: "categories"
      });
      this.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "parent_category"
      });
      this.hasMany(models.Device, {
        foreignKey: "category_id",
        as: "devices"
      });
      this.belongsTo(models.Accessory, {
        foreignKey: 'category_id',
        as: "accessories"
      });
      this.belongsToMany(models.MarketOffer, {
        foreignKey: 'category_id',
        through: models.MarketOfferDivice
      });
      this.belongsToMany(models.PriceEdition, {
        foreignKey: 'category_id',
        through: models.DevicePriceEdition
      });
      this.belongsToMany(models.Target, {
        foreignKey: 'category_id',
        through: models.DeviceTarget
      });
      this.hasMany(models.DeviceExchange, {
        foreignKey: 'category_id',
        as: 'device_exchanges'
      });
      this.belongsToMany(models.Bill, {
        foreignKey: "category_id",
        through: models.DeviceBill
      });
    }
  }
  Category.init({
    name: {
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
    modelName: 'Category',
  });
  return Category;
};