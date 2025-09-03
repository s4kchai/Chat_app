const jwt = require("jsonwebtoken");
const router = require("express");

const authService = require("../services/authService");
const { StatusCodes } = require("http-status-codes");

const ACCESS_SECRET = process.env.ACCESS_SECRET;

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(StatusCodes.UNAUTHORIZED);

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(StatusCodes.FORBIDDEN);
    req.user = user;
    next();
  });
}

module.exports = authenticate;
