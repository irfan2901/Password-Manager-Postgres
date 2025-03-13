const User = require("../model/userModel");
const Category = require("../model/categoryModel");
const PasswordModel = require("../model/passwordModel");
const bcrypt = require("bcryptjs");

const addPassword = async (req, res) => {
    const { website, username, Password } = req.body;

    try {
        const category = await Category.findOne({ where: { name: req.params.categoryName } });

        if (!category) {
            return res.status(404).json({ message: "Category notfound" });
        }

        const user = await User.findByPk(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const savedPassword = await PasswordModel.create({ website: website, username: username, Password: hashedPassword, userId: user.userId, categoryId: category.categoryId });
        return res.status(201).json({ savedPassword });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePassword = async (req, res) => {
    try {
        const category = await Category.findOne({ where: { name: req.params.categoryName } });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const user = await User.findByPk(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { website, username, Password } = req.body;
        const updatedPassword = await PasswordModel.findOne({ where: { userId: user.userId, categoryId: category.categoryId, passwordId: req.params.passwordId } });
        if (!updatedPassword) {
            return res.status(404).json({ message: "Password not found" });
        }

        if (website) updatedPassword.website = website;
        if (username) updatedPassword.username = username;
        if (Password) {
            const salt = await bcrypt.genSalt(10);
            updatedPassword.Password = await bcrypt.hash(Password, salt);
        }

        await updatedPassword.save();
        await updatedPassword.reload();
        return res.status(200).json({ updatedPassword });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deletePassword = async (req, res) => {
    try {
        const category = await Category.findOne({ where: { name: req.params.categoryName } });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const user = await User.findByPk(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const password = await PasswordModel.findOne({ where: { userId: user.userId, categoryId: category.categoryId, passwordId: req.params.passwordId } });

        if (!password) {
            return res.status(404).json({ message: "Password not found" });
        }

        await password.destroy();
        return res.status(200).json({ message: "Password deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getPasswords = async (req, res) => {
    try {
        const category = await Category.findOne({ where: { name: req.params.categoryName } });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const passwords = await PasswordModel.findAll({ where: { userId: req.user.userId, categoryId: category.categoryId } });

        if (passwords.length === 0) {
            return res.status(404).json({ message: "Passwords not found" });
        }

        return res.status(200).json({ passwords });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getcurrentPassword = async (req, res) => {
    try {
        const category = await Category.findOne({ where: { name: req.params.categoryName } });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const user = await User.findByPk(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const password = await PasswordModel.findOne({ where: { userId: user.userId, categoryId: category.categoryId, passwordId: req.params.passwordId } });

        return res.status(200).json({ password });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addPassword, updatePassword, deletePassword, getPasswords, getcurrentPassword };