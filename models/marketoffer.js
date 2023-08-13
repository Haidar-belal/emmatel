'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarketOffer extends Model {
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
      this.belongsToMany(models.Category, {
        foreignKey: 'market_offer_id',
        through: models.MarketOfferDivice
      });
    }
  }
  MarketOffer.init({
    discount: {
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
    modelName: 'MarketOffer',
  });
  return MarketOffer;
};