const {
  describe, it, expect, beforeAll,
} = require('@jest/globals');
const request = require('supertest');

const app = require('../app');
const sequelize = require('../database/sequelize');

beforeAll(async () => {
  await sequelize.sync();
});

describe('users', () => {
  describe('POST /users', () => {
    it('should create a new user successfully', async () => {
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
        id: 1,
        name: 'Douglas Junior',
        email: 'douglas@mail.com',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });

    it('should validate if user name is a string', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: 123456,
          email: 'douglas@mail.com',
          password: 'senha123',
        })
        .accept('application/json')
        .expect('Content-Type', 'application/json; charset=utf-8');

      expect(response.statusCode).toBe(412);
      expect(response.body).toEqual([{
        location: 'body',
        msg: 'O name deve ser uma string.',
        path: 'name',
        type: 'field',
        value: 123456,
      }]);
    });

    it('should validate if the email is unique', async () => {
      await request(app)
        .post('/users')
        .send({
          name: 'Douglas Junior',
          email: 'douglas2@mail.com',
          password: 'senha123',
        })
        .accept('application/json');
      const response = await request(app)
        .post('/users')
        .send({
          name: 'Douglas Junior',
          email: 'douglas2@mail.com',
          password: 'senha123',
        })
        .accept('application/json')
        .expect('Content-Type', 'text/html; charset=utf-8');

      expect(response.statusCode).toBe(412);
      expect(response.text).toBe('E-mail já cadastrado!');
    });
  });
});
