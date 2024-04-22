const { checkSchema } = require('express-validator');

const validateCreateTask = checkSchema(
  {
    // TODO: implementar validação
  },
  ['body'],
);

const validateUpdateTask = checkSchema(
  {
    // TODO: implementar validação
  },
  ['body'],
);

module.exports = {
  validateCreateTask,
  validateUpdateTask,
};
