'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobTitle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Employee, {
        foreignKey: 'job_title_id',
        as: 'employees'
      });
      this.hasMany(models.Manager, {
        foreignKey: 'job_title_id',
        as: 'managers'
      });
    }
  }
  JobTitle.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        require: true
      }
    },
    salary: {
      type: DataTypes.DOUBLE.UNSIGNED,
      allowNull: false,
      validator: {
        require: true
      }
    }
  }, {
    sequelize,
    modelName: 'JobTitle',
    underscored: true
  });
  return JobTitle;
};