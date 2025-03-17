const request = require('supertest');
const { app } = require('../app'); // Import both app and server

describe('App Endpoints', () => {
  // Start the server before all tests
  beforeAll((done) => {
    app.on('listening', () => {
      done();
    });
  });

  // Close the server after all tests
  afterAll((done) => {
    app.close(() => {
      done();
    });
  });

  test('GET / should serve the index page', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('text/html');
  });

  test('GET /api/health should return health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body.status).toBe('healthy');
  });

  test('GET /api/info should return app info', async () => {
    const res = await request(app).get('/api/info');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('app');
    expect(res.body).toHaveProperty('version');
    expect(res.body).toHaveProperty('environment');
  });
});