'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TargetLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.AccessoryTarget, {
        foreignKey: 'accessory_target_id',
        as: 'accessory_target'
      });
    }
  }
  TargetLevel.init({
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
    price_per_unit: {
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
    modelName: 'TargetLevel',
    underscored: true
  });
  return TargetLevel;
};