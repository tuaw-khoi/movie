const db = require("../models");
const { Sequelize } = require("sequelize");
const createCountry = async (req, res) => {
  try {
    const { name } = req.body;
    const Country = await db.Country.findOne({ where: { name: name } });
    if (Country) {
      return res
        .status(404)
        .json({ success: false, message: "Country was exit" });
    }

    if (!Country && name.length > 0) {
      await db.Country.create({ name: name });
    }

    return res.status(200).json({ success: true, data: name });
  } catch (error) {
    console.error("Error creating Country:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getAllCountry = async (req, res) => {
  try {
    const Countrys = await db.Country.findAll();

    return res.status(200).json({
      success: true,
      data: Countrys,
    });
  } catch (error) {
    console.error("Error getting all Country:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const { CountryId: id } = req.query;
    const Country = await db.Country.findByPk(id);
    if (!Country) {
      return res.status(404).json({
        success: false,
        message: "Country not found",
      });
    }
    await db.Country.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Country deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Country:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateCountry = async (req, res) => {
  try {
    const { CountryId: id } = req.query;
    const { name } = req.body;

    const Country = await db.Country.findByPk(id);

    if (!Country) {
      return res.status(404).json({
        success: false,
        message: "Country not found",
      });
    }

    await Country.update({
      name: name || Country.name,
    });

    return res.status(200).json({
      success: true,
      message: "Country updated successfully",
      data: Country,
    });
  } catch (error) {
    console.error("Error updating Country:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  updateCountry,
  createCountry,
  deleteCountry,
  getAllCountry,
};
