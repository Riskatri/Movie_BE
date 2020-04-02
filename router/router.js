const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const movieController = require("../controller/movieController");
const movie_userController = require("../controller/movie_userController");

module.exports = function(app) {
  // register dan login
  app.post(
    "/signup",
    [verifySignUp.checkDuplicateUserNameOrEmail],
    authController.signup
  );
  app.post("/login", authController.signin);

  // get all user
  app.post("/users", [authJwt.verifyToken], userController.users); // get 1 user according to roles
  app.get("/users", [authJwt.verifyToken], userController.users);

  //books
  app.post("/movies", [authJwt.verifyToken], movieController.movie);

  app.get("/movies", [authJwt.verifyToken], movieController.seeMovie);
  app.get("/movies/:id", [authJwt.verifyToken], movieController.moviebyid);

  //order
  app.post(
    "/orders/:id",
    [authJwt.verifyToken],
    movie_userController.OrderMovie
  );
  app.get("/orders", [authJwt.verifyToken], movie_userController.users);
};
