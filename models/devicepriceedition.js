'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DevicePriceEdition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DevicePriceEdition.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        require: true,
        isFloat: true
      }
    },
    category_id: DataTypes.INTEGER,
    price_edition_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DevicePriceEdition',
  });
  return DevicePriceEdition;
};