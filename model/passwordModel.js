const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Password = sequelize.define('Password', {
    passwordId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    website: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING
    },
    Password: {
        type: DataTypes.STRING
    }
}, { timestamps: true });

module.exports = Password;