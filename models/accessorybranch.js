'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessoryBranch extends Model {
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
  AccessoryBranch.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'AccessoryBranch',
  });
  return AccessoryBranch;
};