"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsTo(models.Genre, { foreignKey: "genre_id" });

      Movie.belongsTo(models.Country, { foreignKey: "country_id" });

      Movie.hasMany(models.MovieUrls, { foreignKey: "MovieId" });
    }
  }
  Movie.init(
    {
      title: DataTypes.STRING,
      release_year: DataTypes.DATE,
      genre_id: DataTypes.STRING,
      description: DataTypes.TEXT,
      runtime: DataTypes.INTEGER,
      country_id: DataTypes.STRING,
      moviesUrl_id: DataTypes.STRING,
      trailer_url: DataTypes.STRING,
      img_url: DataTypes.STRING,
      directors: DataTypes.STRING,
      actor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  Movie.afterCreate(async (movie, options) => {
    try {
      const MovieUrls = await sequelize.models.MovieUrls.create({
        MovieId: movie.id,
      });
      movie.moviesUrl_id = MovieUrls.id;
      await movie.save();
    } catch (error) {
      console.error("Error creating Movie", error);
      throw new Error("Failed to create movieUrl");
    }
  });
  return Movie;
};
