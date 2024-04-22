const { checkSchema } = require('express-validator');

const validateLogin = checkSchema(
  {
    // TODO: implementar validação
  },
  ['body'],
);

const validateCreateUser = checkSchema(
  {
    // TODO: implementar validação
  },
  ['body'],
);

module.exports = {
  validateLogin,
  validateCreateUser,
};
