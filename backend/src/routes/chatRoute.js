var express = require("express");
var router = express.Router();
const roomController = require("../controllers/roomController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, roomController.getRoombyId);
router.post("/", authMiddleware, roomController.create);

module.exports = router;
