const router = require("express").Router();
const Joi = require("joi");
const validateDto = require("../middlewares/validation.js");
const { string, stringReq } = require("../middlewares/joiSchema.js");
const {
  login,
  getAll,
  register,
  deleteUser,
  updateUser,
  refreshLogin,
  updatePassword,
} = require("../controllers/user.js");
router.get("/", getAll);
router.post(
  "/login",
  validateDto(Joi.object({ username: stringReq, password: stringReq })),
  login
);
router.post(
  "/register",
  validateDto(
    Joi.object({
      fullName: stringReq,
      password: stringReq,
      email: stringReq,
      username: stringReq,
      role: string,
    })
  ),
  register
);
router.delete("/deleteUser", deleteUser);
router.post("/updateUser", updateUser);
router.post("/updatePassword", updatePassword);
router.get("/refreshLogin", refreshLogin);
module.exports = router;
