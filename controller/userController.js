const db = require("../config/db.js");
const User = db.user;
const asyncMiddleware = require("express-async-handler");

exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["id", "name", "username", "email"]
  });
  res.status(200).json({
    description: "All User",
    user: user
  });
});

exports.userbyid = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: ["id", "name", "username", "email"]
  });
  res.status(200).json({
    description: "User by Id",
    user: user
  });
});
