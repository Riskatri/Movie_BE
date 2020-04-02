const db = require("../config/db.js");
const config = require("../config/config.js");
const Movie = db.movie;
const User = db.user;

const asyncMiddleware = require("express-async-handler");

//get order
exports.OrderMovie = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId }
  });
  const movie = await Movie.findOne({
    where: { id: req.params.id }
  });
  await user.addMovies(movie);
  res.status(201).send({
    user: user,
    movie: movie,
    status: "order success"
  });
});

//show all order book
//exports.user  ( id books, author, published_date, published_id,)
exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Movie,
        attributes: ["original_title", "release_date"],
        through: {
          attributes: ["userId", "movieId"]
        }
      }
    ]
  });
  res.status(200).json({
    user: user,
    description: "All order movie"
  });
});
