var express = require("express");
var router = express.Router();
const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const roomRouter = require("./roomRoute");
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/room", roomRouter);

module.exports = router;
