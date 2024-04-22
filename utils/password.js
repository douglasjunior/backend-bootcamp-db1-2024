const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

/**
 * Faz o hash da senha do usuário para armazenar no banco e dados
 * usando bcrypt.
 *
 * Docs: https://github.com/dcodeIO/bcrypt.js
 * Docs: https://pt.wikipedia.org/wiki/Bcrypt
 *
 * @param {string} password
 * @returns {string}
 */
const hashPassword = (password) => bcrypt.hashSync(password, salt);

/**
 * Compara a senha original ao hash gerado pelo bcrypt,
 * para verificar se são equivalentes.
 *
 * Docs: https://github.com/dcodeIO/bcrypt.js
 * Docs: https://pt.wikipedia.org/wiki/Bcrypt
 *
 * @param {string} password
 * @param {string} hash
 * @returns {boolean}
 */
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  hashPassword,
  comparePassword,
};
