const Post = require('../models/Post');
const ApiError = require('../utils/ApiError');

class PostRepository {
  async findAll() {
    return Post.find().sort({ createdAt: -1 }).lean();
  }

  async create(payload) {
    return Post.create(payload);
  }

  async deleteById(id) {
    const removed = await Post.findByIdAndDelete(id);
    if (!removed) throw ApiError.notFound('Post not found');
    return removed;
  }
}

module.exports = new PostRepository();
