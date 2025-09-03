var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/", authMiddleware, userController.getAllUsers);

module.exports = router;
