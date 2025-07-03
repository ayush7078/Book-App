require('dotenv').config();
const request = require('supertest');
const app = require('../app');

let token;
let bookId;

beforeAll(async () => {
  // Register and login user to get token
  await request(app).post('/api/auth/register').send({ email: 'booktester@example.com', password: 'password' });
  const res = await request(app).post('/api/auth/login').send({ email: 'booktester@example.com', password: 'password' });
  token = res.body.token;
});

describe('Books Endpoints', () => {
  it('should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Book',
        author: 'Test Author',
        genre: 'Test Genre',
        publishedYear: 2025
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Test Book');
    bookId = res.body.id;
  });

  it('should get all books', async () => {
    const res = await request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a book by ID', async () => {
    const res = await request(app)
      .get(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(bookId);
  });

  it('should update a book by ID', async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Title' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('should delete a book by ID', async () => {
    const res = await request(app)
      .delete(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });
});
