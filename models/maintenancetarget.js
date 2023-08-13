'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaintenanceTarget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Target, {
        foreignKey: 'target_id',
        as: 'target'
      });
    }
  }
  MaintenanceTarget.init({
    number: {
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
    modelName: 'MaintenanceTarget',
    underscored: true
  });
  return MaintenanceTarget;
};