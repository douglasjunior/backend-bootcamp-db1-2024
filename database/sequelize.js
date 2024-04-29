const { Sequelize } = require('sequelize');

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

const defineOptions = {
  // Ativa os timestamps e configura para que os nomes das tabelas e colunas sejam criados
  // com underline entre as palavras (snake_case).
  // Docs: https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
  timestamps: true,
  underscored: true, // snake_case
};

let sequelize;

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const SQLite = require('sqlite3');

  sequelize = new Sequelize(
    null,
    null,
    null,
    {
      dialect: 'sqlite',
      storage: ':memory:',
      define: defineOptions,
      dialectOptions: {
        mode: SQLite.OPEN_READWRITE || SQLite.OPEN_CREATE || SQLite.OPEN_FULLMUTEX,
      },
    },
  );
} else {
  sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
      dialect: 'mysql',
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      define: defineOptions,
    },
  );
}

module.exports = sequelize;
