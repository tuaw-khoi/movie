const Joi = require("joi");
exports.string = Joi.string().allow(null, " ");
exports.stringReq = Joi.string().required();
exports.number = Joi.number().allow(null, " ");
exports.numberReq = Joi.number().required();
exports.arrayReq = Joi.array().required();
exports.array = Joi.array().allow(null, " ");
