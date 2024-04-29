const path = require('path');
const dotenv = require('dotenv').config;

dotenv({
  path: path.resolve(__dirname, './dev.env'),
});

process.env.NODE_ENV = 'test';
