const { checkSchema } = require('express-validator');

const validateLogin = checkSchema(
  {
    // TODO: implementar validação
  },
  ['body'],
);

const validateCreateUser = checkSchema(
  {
    name: {
      isString: {
        errorMessage: 'O name deve ser uma string.',
      },
      isLength: {
        options: {
          max: 200,
          min: 1,
        },
        errorMessage: 'O name deve ter no mínimo 1 e no máximo 200 caracteres.',
      },
      notEmpty: {
        errorMessage: 'O name é requerido.',
      },
    },
    email: {
      isEmail: {
        errorMessage: 'O email deve ser um endereço de e-mail válido.',
      },
      isLength: {
        options: {
          max: 200,
          min: 1,
        },
        errorMessage: 'O email deve ter no mínimo 1 e no máximo 200 caracteres.',
      },
      notEmpty: {
        errorMessage: 'O email é requerido.',
      },
    },
    password: {
      isString: {
        errorMessage: 'O password deve ser uma string.',
      },
      isLength: {
        options: {
          max: 20,
          min: 8,
        },
        errorMessage: 'O password deve ter no mínimo 8 e no máximo 20 caracteres.',
      },
      notEmpty: {
        errorMessage: 'O password é requerido.',
      },
    },
  },
  ['body'],
);

module.exports = {
  validateLogin,
  validateCreateUser,
};
