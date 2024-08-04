const jwt = require("jsonwebtoken");

const checkAdmin = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  try {
    const jwtObject = jwt.verify(token, "secret");
    if (jwtObject.role === "admin") {
      next();
    } else {
      res.status(403).json({
        message: "Permission denied: You are not an admin.",
      });
    }
  } catch (exception) {
    res.status(401).json({
      message: "Unauthorized: Invalid or missing token.",
    });
  }
};

module.exports = checkAdmin;
