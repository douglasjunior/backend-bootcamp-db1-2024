const express = require('express');
const { ValidationError } = require('sequelize');

const { validationResultCheck } = require('../validators');
const { validateCreateUser, validateLogin } = require('../validators/users');

const router = express.Router();

function isUniqueEmailError(error) {
  if (!(error instanceof ValidationError)) {
    return false;
  }

  return error.errors.find((databaseError) => (
    databaseError.type === 'unique violation' && databaseError.path === 'email'
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

      // TODO: implementar aqui
    } catch (error) {
      console.warn(error);
      if (isUniqueEmailError(error)) {
        res.status(402).send('E-mail já cadastrado!');
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

      // TODO: implementar aqui
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

module.exports = router;
