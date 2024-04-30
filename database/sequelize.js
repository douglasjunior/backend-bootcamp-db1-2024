const { Sequelize } = require('sequelize');

const {
  NODE_ENV,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

const mySqlOptions = {
  dialect: 'mysql',
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  define: {
    // Ativa os timestamps e configura para que os nomes das tabelas e colunas sejam criados
    // com underline entre as palavras (snake_case).
    // Docs: https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
    timestamps: true,
    underscored: true, // snake_case
  },
};

const sqliteOptions = {
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
  define: mySqlOptions.define,
};

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  NODE_ENV === 'test' ? sqliteOptions : mySqlOptions,
);

module.exports = sequelize;
