"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MovieUrls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovieUrls.belongsTo(models.Movie, { foreignKey: "MovieId" });
    }
  }
  MovieUrls.init(
    {
      MovieId: DataTypes.STRING,
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MovieUrls",
    }
  );
  return MovieUrls;
};
