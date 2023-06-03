const { DataTypes } = require("sequelize");
const dbConfig  = require("../config/db")

const Sequelize = require('sequelize');

const Command = dbConfig.define(
        "command",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            senderName: {
                  type: DataTypes.STRING,
                  allowNull: false,
            },
            senderAddress: {
                  type: DataTypes.STRING,
                  allowNull: false,
            },
            senderPhone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            senderEmail: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            receiverName: {
                  type: DataTypes.STRING,
                  allowNull: false,
            },
            receiverAddress: {
                  type: DataTypes.STRING,
                  allowNull: false,
            },
            receiverPhone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            receiverEmail: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            shipmentDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            shipmentName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            shipmentCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            shipmentValue: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            shipmentPrice: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            shipmentWeight: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            shipmentService: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            shipmentState: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            trackingCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports = Command;
