const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

function validate(req, _res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = {};
  result.array().forEach((e) => { errors[e.param || e.path] = e.msg; });
  next(new ApiError(422, 'Validation failed', errors));
}

module.exports = validate;
