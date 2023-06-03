const { DataTypes } = require("sequelize");
const dbConfig  = require("../config/db")


const Sequelize = require('sequelize');


const Agent = dbConfig.define(
        "agent",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports = Agent;
