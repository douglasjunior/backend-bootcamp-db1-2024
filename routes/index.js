const express = require('express');
const sequelize = require('../database/sequelize');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('As rotas disponíveis são "/users" e "/tasks".');
});

/**
 * Healthcheck é utilizado para verificar se a aplicação está funcionando.
 * Neste caso em particular, é util quando a aplicação está rodando em um
 * orquestrador de containers, como o Kubernetes ou Docker Swarm, que pode reiniciar o
 * container caso a aplicação não responda corretamente.
 */
router.get('/healthcheck', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(204).send();
  } catch (error) {
    console.warn(error);
    res.status(500).send();
  }
});

module.exports = router;
