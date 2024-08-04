const router = require("express").Router();
const {
  getAllGenres,
  deleteGenres,
  updateGenres,
  createGenres,
} = require("../controllers/genre.js");
router.get("/", getAllGenres);
router.delete("/deleteGenres", deleteGenres);
router.post("/createGenres", createGenres);
router.post("/updateGenres", updateGenres);
module.exports = router;
