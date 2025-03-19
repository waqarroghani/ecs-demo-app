const request = require('supertest');
const { app,server } = require('../app'); 

describe('App Endpoints', () => {
  
  beforeAll((done) => {
    server.on('listening', () => {
      done();
    });
  });

  
  afterAll((done) => {
    server.close(() => {
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