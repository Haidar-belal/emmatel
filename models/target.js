'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Target extends Model {
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
      this.belongsTo(models.BranchSection, {
        foreignKey: 'branch_section_id',
        as: 'branch_section'
      });
      this.hasMany(models.MaintenanceTarget, {
        foreignKey: 'target_id',
        as: 'Maintenances'
      });
      this.belongsToMany(models.Accessory, {
        foreignKey: 'target_id',
        through: models.AccessoryTarget
      });
      this.belongsToMany(models.Category, {
        foreignKey: 'target_id',
        through: models.DeviceTarget
      });
    }
  }
  Target.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
        isAlpha: true
      }
    },
    apsencc: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Target',
    underscored: true
  });
  return Target;
};