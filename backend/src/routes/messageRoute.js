var express = require("express");
var router = express.Router();
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:roomId", authMiddleware, messageController.getByRoom);
router.post("/", authMiddleware, messageController.create);
module.exports = router;
