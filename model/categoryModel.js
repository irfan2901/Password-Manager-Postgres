const { DataTypes } = require("sequelize");
const sequelize = require("../config/db")

const Category = sequelize.define('Category', {
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, { timestamps: true });

module.exports = Category;