const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const db = require("../config/db.js");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access- token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "No token provided."
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Fail to Authentication. Error -> " + err
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {};
authJwt.verifyToken = verifyToken;

module.exports = authJwt;
