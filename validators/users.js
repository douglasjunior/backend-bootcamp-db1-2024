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
      isString: true,
      isLength: {
        options: {
          max: 200,
          min: 1,
        },
      },
      optional: false,
    },
    email: {
      isString: true,
      isEmail: true,
      isLength: {
        options: {
          max: 200,
          min: 1,
        },
      },
      optional: false,
    },
    password: {
      isString: true,
      isLength: {
        options: {
          max: 20,
          min: 8,
        },
      },
      optional: false,
    },
  },
  ['body'],
);

module.exports = {
  validateLogin,
  validateCreateUser,
};
