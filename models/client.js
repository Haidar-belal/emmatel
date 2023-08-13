'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Client extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Appointment, {
                foreignKey: 'client_id',
                as: 'appointments'
            });
            this.hasMany(models.Bill, {
                foreignKey: 'client_id',
                as: 'bills'
            });
        }
    }
    Client.init({
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                require: true,
                isAlpha: true
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                require: true,
                isAlpha: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'phone number already in use!'
            },
            validate: {
                require: true,
            }
        },
        card_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'card number already in use!'
            },
            validate: {
                require: true,
                isAlpha: true
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
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                require: true,
                isAlpha: true
            }
        },
    }, {
        sequelize,
        modelName: 'Client',
        underscored: true
    });
    return Client;
};