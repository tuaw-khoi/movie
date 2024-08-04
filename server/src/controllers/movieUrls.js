const db = require("../models");
const { Sequelize } = require("sequelize");

const updateMovieUrls = async (MovieUrls, id) => {
  try {
    const MovieUrl = await db.MovieUrls.findOne({ where: { MovieId: id } });
    if (!MovieUrl) {
      return {
        success: false,
        message: "MovieUrls not found",
      };
    }

    await MovieUrl.update({
      link: MovieUrls || MovieUrl.link,
    });

    return {
      success: true,
      message: "MovieUrls updated successfully",
      data: MovieUrl,
    };
  } catch (error) {
    console.error("Error updating MovieUrls:", error);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

module.exports = {
  updateMovieUrls,
};
