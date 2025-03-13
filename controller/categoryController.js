const Category = require("../model/categoryModel");

const addCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Category name is required" });
    }

    try {
        const category = await Category.create({ name: name });
        return res.status(201).json({ category });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ where: { name: req.params.categoryName } });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const { name } = req.body;

        if (name) category.name = name;

        await category.save();
        return res.status(200).json({ category })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ where: { name: req.params.categoryName } });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await category.destroy();
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json({ categories });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addCategory, updateCategory, deleteCategory, getCategories };