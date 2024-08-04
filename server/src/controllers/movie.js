const db = require("../models");
const { Sequelize } = require("sequelize");
const { updateMovieUrls } = require("./movieUrls");
const createMovie = async (req, res) => {
  try {
    const img_url = req.file.path;
    const {
      title,
      release_year,
      genre_id,
      description,
      runtime,
      country_id,
      trailer_url,
      moviesUrl_id,
      actor,
      directors,
    } = req.body;

    const movie = await db.Movie.create({
      title,
      release_year,
      genre_id,
      description,
      runtime,
      country_id,
      img_url,
      trailer_url,
      actor,
      directors,
    });
    const updateMovieurl = await updateMovieUrls(moviesUrl_id, movie.id);
    return res.status(200).json({
      success: true,
      data: movie,
      movieurl: updateMovieurl,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllMovie = async (req, res) => {
  try {
    const movies = await db.Movie.findAll();

    for (let movie of movies) {
      const movieUrl = await db.MovieUrls.findOne({
        where: { MovieId: movie.id },
        attributes: ["link"],
      });
      const country = await db.Country.findByPk(movie.country_id);
      const genre = await db.Genre.findByPk(movie.genre_id);
      if (movieUrl) {
        movie.moviesUrl_id = movieUrl.link;
      }
      if (country) {
        movie.country_id = country.name;
      }
      if (genre) {
        movie.genre_id = genre.name;
      }
    }

    return res.status(200).json({
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.query;
    await db.Movie.destroy({
      where: {
        id,
      },
    });
    return res
      .status(200)
      .json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
const updateMovie = async (req, res) => {
  try {
    let img_url = "";
    if (req.file) {
      img_url = req.file.path;
    }
    const {
      id,
      title,
      release_year,
      genre_id,
      description,
      runtime,
      country_id,
      trailer_url,
      moviesUrl_id,
      actor,
      directors,
    } = req.body;
    const Movie = await db.Movie.findByPk(id);
    if (!Movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    await Movie.update({
      title: title || Movie.title,
      genre_id: genre_id || Movie.genre_id,
      release_year: release_year || Movie.release_year,
      description: description || Movie.description,
      runtime: runtime || Movie.runtime,
      country_id: country_id || Movie.country_id,
      trailer_url: trailer_url || Movie.trailer_url,
      img_url: img_url || Movie.img_url,
      actor: actor || Movie.actor,
      directors: directors || Movie.directors,
    });
    const updateMovieurl = await updateMovieUrls(moviesUrl_id, id);
    return res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: Movie,
      movieurl: updateMovieurl,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { updateMovie, createMovie, deleteMovie, getAllMovie };
