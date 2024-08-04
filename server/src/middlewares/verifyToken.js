var jwt = require("jsonwebtoken");
const checkToken = (req, res, next) => {
  if (
    req?.url?.toLowerCase().trim() == "/login".toLowerCase().trim() ||
    req?.url?.toLowerCase().trim() == "/register".toLowerCase().trim()
  ) {
    next();
    return;
  }
  const token = req?.headers?.authorization?.split(" ")[1];
  try {
    const jwtObject = jwt.verify(token, "secret");
    const isExpired = Date.now() >= jwtObject.exp * 1000;

    if (isExpired) {
      res?.status(405).json({
        message: "Token is expired",
      });
      res.end();
    } else {
      next();
      return;
    }
  } catch (exception) {
    res?.status(404).json({
      message: exception.message,
    });
  }
};
module.exports = checkToken;
