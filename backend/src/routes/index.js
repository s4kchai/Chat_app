var express = require("express");
var router = express.Router();
const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.use("/auth", authRoute);
router.use("/user", userRoute);

module.exports = router;
