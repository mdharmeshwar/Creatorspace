import { api } from './axios';

export const postsApi = {
  list: (params) => api.get('/posts', { params }).then((r) => r.data),
  get: (id) => api.get(`/posts/${id}`).then((r) => r.data),
  create: (formData) =>
    api.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data),
  remove: (id) => api.delete(`/posts/${id}`).then((r) => r.data),
};
