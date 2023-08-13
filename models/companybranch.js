'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyBranch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Manager, {
        foreignKey: "manager_id",
        as: 'manager'
      });
      this.hasMany(models.BranchSection, {
        foreignKey: "company_branch_id",
        as: "branch_sections"
      });
      this.hasMany(models.Device, {
        foreignKey: "company_branch_id",
        as: "devices"
      });
      this.belongsToMany(models.Accessory, {
        foreignKey: 'company_branch_id',
        through: models.AccessoryBranch
      });
      this.hasMany(models.Appointment, {
        foreignKey: "company_branch_id",
        as: "appointments"
      });
      this.hasMany(models.Exchange, {
        foreignKey: 'sender_branch_id',
        as: 'send_exchanges'
      });
      this.hasMany(models.Exchange, {
        foreignKey: 'receiver_branch_id',
        as: 'receiver_exchanges'
      });
    }
  }
  CompanyBranch.init({
    number: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        require: true,
        isInt: true
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
        isAlpha: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
        isAlpha: true
      }
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
        isAlpha: true
      }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
        isAlpha: true
      }
    },
    near_by: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
        isAlpha: true
      }
    },
  }, {
    sequelize,
    modelName: 'CompanyBranch',
    underscored: true
  });
  return CompanyBranch;
};