const { body } = require('express-validator');
const { POST_TITLE_MIN, POST_TITLE_MAX, POST_DESC_MIN, POST_DESC_MAX } = require('../constants');

const createPostRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: POST_TITLE_MIN, max: POST_TITLE_MAX })
    .withMessage(`Title must be ${POST_TITLE_MIN}-${POST_TITLE_MAX} characters`),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: POST_DESC_MIN, max: POST_DESC_MAX })
    .withMessage(`Description must be ${POST_DESC_MIN}-${POST_DESC_MAX} characters`),
  body('image')
    .custom((_value, { req }) => {
      if (!req.file) {
        throw new Error('Image thumbnail is required');
      }

      return true;
    }),
];

module.exports = { createPostRules };
