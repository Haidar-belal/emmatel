'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BranchBalance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.BranchSection, {
        foreignKey: 'branch_section_id',
        as: "branch_section"
      });
    }
  }
  BranchBalance.init({
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        require: true,
        isFloat: true
      }
    },
    ok: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'BranchBalance',
    underscored: true
  });
  return BranchBalance;
};