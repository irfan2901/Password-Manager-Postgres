const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { registerUser, loginUser, updateUser, deleteUser, getUser } = require("../controller/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:id", auth, updateUser);
router.delete("/delete/:id", auth, deleteUser);
router.get("/current", auth, getUser);

module.exports = router;