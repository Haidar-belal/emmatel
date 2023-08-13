'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessoryExchange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.AccessoryColor, {
        foreignKey: 'accessory_color_id',
        as: 'accessory_color'
      });
    }
  }
  AccessoryExchange.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AccessoryExchange',
    underscored: true
  });
  return AccessoryExchange;
};