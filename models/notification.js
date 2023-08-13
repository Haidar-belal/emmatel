'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
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
      this.belongsTo(models.NotificationTitle, {
        foreignKey: 'notification_title_id',
        as: 'notification_title'
      });
    }
  }
  Notification.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        require: true,
      }
    },
  }, {
    sequelize,
    modelName: 'Notification',
    underscored: true
  });
  return Notification;
};