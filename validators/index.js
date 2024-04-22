const { validationResult } = require('express-validator');

const validationResultCheck = (request, response) => {
  const result = validationResult(request);

  if (!result.isEmpty()) {
    response.status(402).json(result.array());
    return true;
  }

  return false;
};

module.exports = {
  validationResultCheck,
};
