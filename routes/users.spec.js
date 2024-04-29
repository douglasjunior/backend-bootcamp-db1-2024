const {
  describe, it, beforeAll, expect,
} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');
const sequelize = require('../database/sequelize');

beforeAll(async () => {
  await sequelize.sync();
});

describe('users', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Douglas Junior',
        email: 'douglas@mail.com',
        password: 'senha123',
      })
      .accept('application/json')
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      email: 'douglas@mail.com',
      id: 1,
      name: 'Douglas Junior',
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });
});
