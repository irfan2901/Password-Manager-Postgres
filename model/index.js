const sequelize = require("../config/db")
const User = require("../model/userModel");
const Category = require("../model/categoryModel");
const Password = require("../model/passwordModel");

User.hasMany(Password, { foreignKey: 'userId', onDelete: 'CASCADE' });
Password.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Password, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Password.belongsTo(Category, { foreignKey: 'categoryId' });

const db = { sequelize, User, Category, Password };
module.exports = db;