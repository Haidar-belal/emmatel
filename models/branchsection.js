'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BranchSection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.CompanyBranch, {
        foreignKey: "company_branch_id",
        as: "company_branch"
      });
      //   this.belongsToMany(models.Employee, {
      //     foreignKey: "branch_section_id",
      //     through: models.Transaction,
      //     as: 'employees'
      // });
      this.hasMany(models.BranchSectionPayment, {
        foreignKey: "branch_section_id",
        as: "branch_section_payments"
      });
      this.hasMany(models.BranchBalance, {
        foreignKey: 'branch_section_id',
        as: "branch_balances"
      });
      this.hasMany(models.Target, {
        foreignKey: 'branch_section_id',
        as: 'targets'
      });
      this.hasMany(models.Transaction, {
        foreignKey: 'branch_section_id',
        as: 'transactions'
      })
      this.hasMany(models.Bill, {
        foreignKey: "branch_section_id",
        as: "bills"
      });
    }
  }
  BranchSection.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
        isAlpha: true
      }
    },
  }, {
    sequelize,
    modelName: 'BranchSection',
    underscored: true
  });
  return BranchSection;
};