const express = require("express");
const router = express.Router();
const { addCategory, updateCategory, deleteCategory, getCategories } = require("../controller/categoryController");

router.get("/", getCategories);
router.post("/addCategory", addCategory);
router.put("/updateCategory/:categoryName", updateCategory);
router.delete("/deleteCategory/:categoryName", deleteCategory);

module.exports = router;