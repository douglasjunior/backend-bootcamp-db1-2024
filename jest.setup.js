const path = require('path');
const dotenv = require('dotenv').config;

dotenv({
  path: path.resolve(__dirname, './dev.env'),
});

process.env.NODE_ENV = 'test';

// Desabilita os warnings do sequelize durante a execução dos testes
require('sequelize/lib/utils/logger').logger.warn = (message) => {
  if (message && message.includes('UNSIGNED')) {
    return;
  }
  console.warn(message);
};
