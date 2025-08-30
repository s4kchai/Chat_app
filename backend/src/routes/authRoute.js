var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middleware/validate");
const { createUserSchema, loginSchema } = require("../schema/userSchema");

router.post("/login", validate(loginSchema), authController.login);
router.post("/register", validate(createUserSchema), authController.register);

module.exports = router;
