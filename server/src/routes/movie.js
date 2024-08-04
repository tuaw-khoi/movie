const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const {
  updateMovie,
  createMovie,
  deleteMovie,
  getAllMovie,
} = require("../controllers/movie.js");
router.get("/", getAllMovie);
router.delete("/deleteMovie", deleteMovie);
router.post(
  "/createMovie",
  fileUploader.single("img_url"),
  (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    createMovie(req, res);
  }
);
router.post(
  "/updateMovie",
  fileUploader.single("img_url"),
  (req, res, next) => {
    updateMovie(req, res);
  }
);
module.exports = router;
