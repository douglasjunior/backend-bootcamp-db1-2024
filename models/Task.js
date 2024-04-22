const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const User = require('./User');

const Task = sequelize.define(
  'tasks',
  {
    id: {
      type: DataTypes.BIGINT({ unsigned: true }),
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    concluded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: false,
    },
  },
  {
    // Docs: https://sequelize.org/docs/v6/core-concepts/model-basics

    // renomeia as colunas timestamps padrões do sequelize
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    // cria index de busca para otimizar as consultas por título da tarefa
    // exemplo: select * from tasks where title like '%abcd%'
    indexes: [
      {
        type: 'FULLTEXT',
        fields: ['title'],
      },
    ],
  },
);

/**
 * Configura a relação entre usuários e tarefas, onde uma tarefa "pertence à" um
 * usuário.
 *
 * Deste modo será criada uma chave estrangeira "user_id" na tabela "tasks".
 *
 * Docs: https://sequelize.org/docs/v6/core-concepts/assocs/
 */
Task.belongsTo(User, {
  // TODO: implementar aqui
});

module.exports = Task;
