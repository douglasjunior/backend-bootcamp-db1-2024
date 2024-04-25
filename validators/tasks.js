const { checkSchema } = require('express-validator');

const validateCreateTask = checkSchema(
  {
    title: {
      isString: {
        errorMessage: 'O title precisa ser uma string.',
      },
      isLength: {
        options: {
          max: 1000,
          min: 1,
        },
        errorMessage: 'O title precisa ter no mínimo 1 e no máximo 1000 caracteres.',
      },
      notEmpty: {
        errorMessage: 'O title é requerido.',
      },
    },
    concluded: {
      isBoolean: {
        errorMessage: 'O concluded precisa ser um boolean.',
      },
      optional: true,
    },
  },
  ['body'],
);

const validateUpdateTask = checkSchema(
  {
    title: {
      isString: {
        errorMessage: 'O title precisa ser uma string.',
      },
      isLength: {
        options: {
          max: 1000,
          min: 1,
        },
        errorMessage: 'O title precisa ter no mínimo 1 e no máximo 1000 caracteres.',
      },
      notEmpty: {
        errorMessage: 'O title é requerido.',
      },
      optional: true,
    },
    concluded: {
      isBoolean: {
        errorMessage: 'O concluded precisa ser um boolean.',
      },
      optional: true,
    },
  },
  ['body'],
);

module.exports = {
  validateCreateTask,
  validateUpdateTask,
};
