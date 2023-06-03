const { DataTypes } = require("sequelize");
const dbConfig  = require("../config/db")
const Sequelize = require('sequelize');

const Message = dbConfig.define(
        "message",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                  type: DataTypes.STRING,
                  allowNull: true,
            },
            phoneNumber: {
                  type: DataTypes.STRING,
                  allowNull: false,
            },
            trackingCode: {
                  type: DataTypes.STRING,
                  allowNull: true,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );
module.exports = Message;
