const ApiError = require('../utils/ApiError');

function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

function errorHandler(err, req, res, _next) {
  const status = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';
  if (status >= 500) console.error('[error]', err.stack || err);

  const body = { success: false, message };
  if (err.details) body.errors = err.details;
  res.status(status).json(body);
}

module.exports = { notFound, errorHandler };
