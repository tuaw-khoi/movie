const router = require("express").Router();
const {
  getAllCountry,
  deleteCountry,
  updateCountry,
  createCountry,
} = require("../controllers/country.js");
router.get("/", getAllCountry);
router.delete("/deleteCountry", deleteCountry);
router.post("/createCountry", createCountry);
router.post("/updateCountry", updateCountry);
module.exports = router;
