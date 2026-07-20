const postRepository = require('../repositories/post.repository');
const { cloudinary, isConfigured } = require('../config/cloudinary');
const ApiError = require('../utils/ApiError');

function streamUpload(buffer, { folder = 'social_app/posts' } = {}) {
  return new Promise((resolve, reject) => {
    if (!isConfigured()) {
      return reject(new ApiError(500, 'Cloudinary not configured'));
    }
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (err, result) => (err ? reject(err) : resolve(result)),
    );
    stream.end(buffer);
  });
}

class PostService {
  async list() {
    return postRepository.findAll();
  }

  async create({ title, description, file }) {
    if (!file) throw ApiError.badRequest('Image thumbnail is required', { field: 'image' });
    const uploaded = await streamUpload(file.buffer);
    const post = await postRepository.create({
      title,
      description,
      imageUrl: uploaded.secure_url,
    });
    return post.toObject();
  }

  async remove(id) {
    const removed = await postRepository.deleteById(id);

    if (removed?.imageUrl && isConfigured()) {
      try {
        const urlParts = removed.imageUrl.split('/upload/');
        if (urlParts.length === 2) {
          const withoutVersion = urlParts[1].replace(/^v\d+\//, '');
          const publicId = withoutVersion.replace(/\.[^.]+$/, '');
          await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
        }
      } catch (err) {
        console.warn('[cloudinary] Failed to delete asset:', err.message);
      }
    }

    return removed;
  }
}

module.exports = new PostService();
