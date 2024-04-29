const {
  describe, it, expect, jest,
} = require('@jest/globals');
const jwt = require('jsonwebtoken');

const { generateUserToken } = require('./token');

describe('token', () => {
  it('should generate token for user', () => {
    const mockUser = {
      name: 'Douglas',
      email: 'douglas@mail.com',
    };
    const token = generateUserToken(mockUser);

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('should call jwt.sign inside generateUserToken', () => {
    const spySign = jest.spyOn(jwt, 'sign');

    const mockUser = {
      name: 'Douglas',
      email: 'douglas@mail.com',
    };
    generateUserToken(mockUser);

    expect(spySign).toHaveBeenCalledTimes(1);
    expect(spySign).toHaveBeenCalledWith(mockUser, process.env.JWT_TOKEN, {
      expiresIn: '7d',
    });

    spySign.mockRestore();
  });
});
