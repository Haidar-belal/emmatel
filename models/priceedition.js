'use strict';
const {
  Model
} = require('sequelize');
const manager = require('./manager');
module.exports = (sequelize, DataTypes) => {
  class PriceEdition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Manager, {
        foreignKey: 'manager_id',
        as: 'manager'
      });
      this.belongsToMany(models.Accessory, {
        foreignKey: 'price_edition_id',
        through: models.AccessoryPriceEdition
      });
      this.belongsToMany(models.Category, {
        foreignKey: 'price_edition_id',
        through: models.DevicePriceEdition
      });
    }
  }
  PriceEdition.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
        isInt: true
      }
    },
  }, {
    sequelize,
    modelName: 'PriceEdition',
  });
  return PriceEdition;
};