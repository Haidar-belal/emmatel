'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AbsenceOrder extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Employee, {
                foreignKey: 'employee_id',
                as: 'employee'
            });
        }
    }
    AbsenceOrder.init({
        time_A: {
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                require: {
                    args: true,
                    msg: "time is require"
                }
            }
        },
        time_B: {
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                require: {
                    args: true,
                    msg: "time is require"
                }
            }
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        sequelize,
        modelName: 'AbsenceOrder',
        underscored: true
    });
    return AbsenceOrder;
};