const db = require("../config/db.js");
const Movie = db.movie;

const asyncMiddleware = require("express-async-handler");
const { validationResult, body } = require("express-validator");

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.validate = method => {
  switch (method) {
    case "movie": {
      return [body("original_title", "maksimal 10 kata").isLength({ max: 10 })];
    }
  }
};

//post an article
exports.movie = asyncMiddleware(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).json({ errors: errors.array() });
      return;
    }
    await Movie.create({
      original_title: req.body.original_title,
      release_date: req.body.release_date
    });
    res.status(201).send({
      status: "Movie has been created!"
    });
  } catch (err) {
    return next(err);
  }
});

exports.moviebyid = asyncMiddleware(async (req, res) => {
  const movie = await Movie.findOne({
    where: { id: req.params.id },
    attributes: ["id", "original_title", "release_date"]
  });
  res.status(200).json({
    description: "Movie by Id",
    user: user
  });
});

//menampilkan semua artikel include user
exports.seeMovie = asyncMiddleware(async (req, res) => {
  const movie = await Movie.findAll({
    attributes: ["id", "original_title", "release_date"]
  });
  res.status(200).json({
    description: "All Movie",
    movie: movie
  });
});
