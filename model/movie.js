module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define("movies", {
    original_title: {
      type: Sequelize.TEXT
    },
    release_date: {
      type: Sequelize.DATE
    }
  });
  return Movie;
};
