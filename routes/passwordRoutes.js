const express = require("express");
const router = express.Router();
const { addPassword, updatePassword, deletePassword, getPasswords, getcurrentPassword } = require("../controller/passwordController");
const auth = require("../middleware/auth");

router.get("/all/:categoryName", auth, getPasswords);
router.get("/getPassword/:categoryName/:passwordId", auth, getcurrentPassword);
router.post("/addPassword/:categoryName", auth, addPassword);
router.put("/updatePassword/:categoryName/:passwordId", auth, updatePassword);
router.delete("/deletePassword/:categoryName/:passwordId", auth, deletePassword);

module.exports = router;