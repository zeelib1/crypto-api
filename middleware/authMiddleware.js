const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  console.log("Cookies:", req.cookies); // log the cookies
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Missing token." });
  }
  console.log("JWT:", token); // log the JWT

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
    console.log("Decoded JWT:", decoded); // log the decoded JWT

    req.userId = decoded.id;
    next();
  });
};
const checkTokenSetUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        console.log(error);
      } else {
        req.user = user;
      }
      next();
    });
  } else {
    next();
  }
};

module.exports = { verifyToken, checkTokenSetUser };
