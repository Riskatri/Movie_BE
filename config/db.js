const env = require("./env.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  logging: false,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.movie = require("../model/movie")(sequelize, Sequelize);
db.user = require("../model/user")(sequelize, Sequelize);

// db.role.belongsToMany(db.user, {
//     through: "user_roles",
//     foreignKey: "roleId",
//     otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//     through: "user_roles",
//     foreignKey: "userId",
//     otherKey: "roleId"
// });

// database user dan movie
db.user.belongsToMany(db.movie, {
  through: "movie_user",
  foreignKey: "userId",
  otherKey: "movieId"
});
db.movie.belongsToMany(db.user, {
  through: "movie_user",
  foreignKey: "movieId",
  otherKey: "userId"
});
module.exports = db;
