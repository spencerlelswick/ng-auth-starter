const jwt = require("jsonwebtoken");

const dotenv = require('dotenv').config()
const AUTH_SECRET = dotenv.parsed.AUTH_SECRET

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,
    AUTH_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
};

const authJwt = {
  verifyToken
};

module.exports = authJwt;