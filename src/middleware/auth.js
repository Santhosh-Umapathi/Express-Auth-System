const jwt = require("jsonwebtoken");
//Model
const { User } = require("../model");

const auth = (req, res, next) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.cookies?.token ||
    req.body?.token;

  if (!token) {
    return res.status(401).send("Token missing");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

module.exports = auth;
