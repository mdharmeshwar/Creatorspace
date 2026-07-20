const { Router } = require('express');
const postController = require('../controllers/post.controller');
const upload = require('../middlewares/upload.middleware');
const validate = require('../middlewares/validate.middleware');
const { createPostRules } = require('../validators/post.validator');

const router = Router();

router.get('/', postController.list);
router.post('/', upload.single('image'), createPostRules, validate, postController.create);
router.delete('/:id', postController.remove);

module.exports = router;
