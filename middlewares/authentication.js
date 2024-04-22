const { validateUserToken } = require('../utils/token');

/**
 * Recebe o valor do cabeçalho Authorization e quebra em partes para obter o token.
 *
 * Por exemplo, ao receber: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...
 * Retornará: eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...
 *
 * @param {string} authorization
 * @return {string}
 */
const getAuthenticationToken = (authorization) => {
  if (!authorization) return null;

  const partes = authorization.split(' ');
  return partes[1];
};

/**
 * Recebe o token de autenticação e carrega o "loggedUser" dentro do request
 * para ser utilizado nas rotas.
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
const middlewareAuthentication = async (request, response, next) => {
  const token = getAuthenticationToken(request.headers.authorization);

  if (!token) {
    response.status(401).send('Token não informado.');
    return;
  }

  try {
    const payload = validateUserToken(token);

    // TODO: implementar aqui

    next();
  } catch (error) {
    console.warn(error);
    response.status(401).send('Token inválido.');
  }
};

module.exports = {
  middlewareAuthentication,
};
