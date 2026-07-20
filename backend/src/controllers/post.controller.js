const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const postService = require('../services/post.service');

class PostController {
  list = asyncHandler(async (_req, res) => {
    const posts = await postService.list();
    return sendSuccess(res, { message: 'Posts fetched', data: posts });
  });

  create = asyncHandler(async (req, res) => {
    const post = await postService.create({
      title: req.body.title,
      description: req.body.description,
      file: req.file,
    });
    return sendSuccess(res, { statusCode: 201, message: 'Post created', data: post });
  });

  remove = asyncHandler(async (req, res) => {
    await postService.remove(req.params.id);
    return sendSuccess(res, { message: 'Post deleted' });
  });
}

module.exports = new PostController();
