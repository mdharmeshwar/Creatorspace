const multer = require('multer');
const ApiError = require('../utils/ApiError');
const { UPLOAD_LIMIT_MB } = require('../config/env');
const { MIME_ALLOWED } = require('../constants');

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: UPLOAD_LIMIT_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (MIME_ALLOWED.includes(file.mimetype)) return cb(null, true);
    cb(new ApiError(422, `Unsupported file type: ${file.mimetype}`, { field: 'image' }));
  },
});

module.exports = upload;
