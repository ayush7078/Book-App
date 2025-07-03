require('dotenv').config();
const request = require('supertest');
const app = require('../app');

describe('Auth Endpoints', () => {
  const testUser = {name:"testuser", email: 'testuser@example.com', password: '123456' };
const loginUser = {email: 'testuser@example.com', password: '123456' };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('User registered');
  });

  it('should login the user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(loginUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });
});
