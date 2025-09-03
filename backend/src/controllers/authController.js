const authService = require("../services/authService");
const { StatusCodes } = require("http-status-codes");
const { loginSchema, createUserSchema } = require("../schema/userSchema");
const jwt = require("jsonwebtoken");

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

async function register(req, res, next) {
  try {
    const { username, password, email } = req.body;

    const existingUser = await authService.findUsername(username);
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({ success: false, msg: "Username already exists" });
    }
    const user = await authService.createUser(username, password, email);
    if (user) {
      return res.status(StatusCodes.CREATED).json({ success: true, msg: "User created", data: user });
    } else {
      return res.status(StatusCodes.CONFLICT).json({ success: false, msg: "Cannot create user" });
    }
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: "Server error" });
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await authService.loginUser(email, password);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, msg: "Invalid credentials" });
    }
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "7d" });
    const accessToken = jwt.sign({ id: user.id }, ACCESS_SECRET, { expiresIn: "1h" });

    const saveToken = await authService.createRefreshToken(user.id, refreshToken);

    if (!saveToken) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        msg: "Error cannot create token",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      msg: "Login successful",
      data: user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: "Server error" });
  }
}

async function generateToken(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;
    const token = await authService.checkRefreshToken(refreshToken);
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid or expired token" });
    }

    let payload;
    try {
      payload = jwt.verify(refreshToken, REFRESH_SECRET);
    } catch (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid or expired token" });
    }

    const accessToken = jwt.sign({ id: payload.id }, ACCESS_SECRET, { expiresIn: "1h" });
    res.status(StatusCodes.OK).json({ success: true, msg: "Refresh Successfully", accessToken });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: "Server error", err: err });
  }
}

module.exports = { register, login, generateToken };
