const express = require('express');
const { ValidationError } = require('sequelize');

const { validationResultCheck } = require('../validators');
const { validateCreateUser, validateLogin } = require('../validators/users');
const User = require('../models/User');
const { comparePassword } = require('../utils/password');
const { generateUserToken } = require('../utils/token');

const router = express.Router();

function isUniqueEmailError(error) {
  if (!(error instanceof ValidationError)) {
    return false;
  }

  return error.errors.find((databaseError) => (
    databaseError.type === 'unique violation' && databaseError.path === 'users_email_unique'
  ));
}

/**
 * Cadastro de usuários
 */
router.post(
  '/',
  validateCreateUser,
  async (req, res) => {
    if (validationResultCheck(req, res)) {
      return;
    }

    try {
      const { name, email, password } = req.body;

      let user = await User.create({
        name, email, password,
      });
      user = await User.findByPk(user.id);

      res.status(201).json(user);
    } catch (error) {
      console.warn(error);
      if (isUniqueEmailError(error)) {
        res.status(412).send('E-mail já cadastrado!');
        return;
      }
      res.status(500).send();
    }
  },
);

/**
 * Login de usuários
 */
router.post(
  '/login',
  validateLogin,
  async (req, res) => {
    if (validationResultCheck(req, res)) {
      return;
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
        attributes: {
          include: ['password'],
        },
      });

      if (
        !user
        || !comparePassword(password, user.get('password'))
      ) {
        res.status(401).send('E-mail ou senha inválidos.');
        return;
      }

      const userPayload = user.toJSON();
      delete userPayload.password;

      const token = generateUserToken(userPayload);

      res.status(200).json({ token });
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

module.exports = router;
