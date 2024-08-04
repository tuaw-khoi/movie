const db = require("../models");
const { Sequelize } = require("sequelize");
const createGenres = async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await db.Genre.findOne({ where: { name: name } });
    if (genre) {
      return res
        .status(404)
        .json({ success: false, message: "genre was exit" });
    }

    if (!genre && name.length > 0) {
      await db.Genre.create({ name: name });
    }

    return res.status(200).json({ success: true, data: name });
  } catch (error) {
    console.error("Error creating Genres:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getAllGenres = async (req, res) => {
  try {
    const Genres = await db.Genre.findAll();

    return res.status(200).json({
      success: true,
      data: Genres,
    });
  } catch (error) {
    console.error("Error getting all Genres:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteGenres = async (req, res) => {
  try {
    const { GenresId: id } = req.query;
    const Genres = await db.Genre.findByPk(id);
    if (!Genres) {
      return res.status(404).json({
        success: false,
        message: "Genres not found",
      });
    }
    await db.Genre.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Genres deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Genres:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateGenres = async (req, res) => {
  try {
    const { GenresId: id } = req.query;
    const { name } = req.body;
    console.log(name, id);
    const Genres = await db.Genre.findByPk(id);

    if (!Genres) {
      return res.status(404).json({
        success: false,
        message: "Genres not found",
      });
    }

    await Genres.update({
      name: name || Genres.name,
    });

    return res.status(200).json({
      success: true,
      message: "Genres updated successfully",
      data: Genres,
    });
  } catch (error) {
    console.error("Error updating Genres:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  updateGenres,
  createGenres,
  deleteGenres,
  getAllGenres,
};
