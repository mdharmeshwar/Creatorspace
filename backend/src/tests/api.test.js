const request = require('supertest');
const buildApp = require('../app');

describe('API', () => {
  const app = buildApp();

  it('health endpoint returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('unknown route returns 404', async () => {
    const res = await request(app).get('/api/nope');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('post creation validates required fields before upload logic runs', async () => {
    const res = await request(app).post('/api/posts');

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Validation failed');
    expect(res.body.errors).toMatchObject({
      title: 'Title must be 3-120 characters',
      description: 'Description must be 3-2000 characters',
      image: 'Image thumbnail is required',
    });
  });
});
