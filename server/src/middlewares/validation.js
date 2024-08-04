const { throwErrorWithStatus } = require("./error.js");

const validateDto = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const modifiedMessage = error.details?.[0].message.replace(/\\/g, "");
    throwErrorWithStatus(403, modifiedMessage, res, next);
    return;
  }
  next();
};

module.exports = validateDto;
