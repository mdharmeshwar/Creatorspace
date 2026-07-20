class ApiError extends Error {
  constructor(statusCode, message, details = {}) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(msg, details) { return new ApiError(400, msg || 'Bad request', details); }
  static notFound(msg) { return new ApiError(404, msg || 'Not found'); }
  static internal(msg) { return new ApiError(500, msg || 'Internal server error'); }
}

module.exports = ApiError;
