'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarketOfferDivice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MarketOfferDivice.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    count: {
      type: DataTypes.DOUBLE.UNSIGNED,
      allowNull: false,
      validate: {
        require: {
          args: true,
          msg: "rest amount is require"
        },
        isInt: true
      }
    },
  }, {
    sequelize,
    modelName: 'MarketOfferDivice',
  });
  return MarketOfferDivice;
};