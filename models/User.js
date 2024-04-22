const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const { hashPassword } = require('../utils/password');

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.BIGINT({ unsigned: true }),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false,
      set(value) {
        // Faz o hash da senha antes que ela seja inserida no banco de dados
        // Docs: https://sequelize.org/docs/v6/core-concepts/getters-setters-virtuals/#setters
        this.setDataValue('password', hashPassword(value));
      },
    },
  },
  {
    // Docs: https://sequelize.org/docs/v6/core-concepts/model-basics

    // cria index único para impedir que e-mails duplicados sejam cadastrados
    indexes: [
      {
        name: 'users_email_unique',
        unique: true,
        fields: ['email'],
      },
    ],

    // renomeia as colunas timestamps padrões do sequelize
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    // configura para que o campo senha seja ocultado por padrão
    // para evitar que seja retornado em consultas
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
  },
);

module.exports = User;
