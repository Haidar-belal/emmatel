'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'employee'
      })
      this.belongsTo(models.BranchSection, {
        foreignKey: 'branch_section_id',
        as: 'branch_section'
      })
    }
  }
  Transaction.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "0"
    },
  }, {
    sequelize,
    modelName: 'Transaction',
    underscored: true
  });
  return Transaction;
};