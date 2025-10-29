const express = require('express');
var router = express.Router();
const jogadorController = require('../controllers/JogadorController.js');
const equipamentoController = require('../controllers/EquipamentoController.js');
const authMiddleware = require('../middlewares/TokenValido.js');

//retorna todos os jogadores
router.get('/jogador', [authMiddleware.check], jogadorController.findAll);

//recupera um jogador pelo seu id
router.get('/jogador/:id', [authMiddleware.check], jogadorController.find);

//cria um novo jogador
router.post('/jogador', [authMiddleware.check], jogadorController.create);

//atualiza um jogador pelo seu id
router.put('/jogador/:id', [authMiddleware.check], jogadorController.update);

//exclui um jogador pelo seu id
router.delete('/jogador/:id', [authMiddleware.check], jogadorController.delete);

//retorna todos os equipamentos de um jogador
router.get('/jogador/:id_jogador/equipamento', [authMiddleware.check], equipamentoController.findByJogador);

//cria um novo equipamento para um jogador
router.post('/jogador/:id_jogador/equipamento', [authMiddleware.check], equipamentoController.create);
module.exports = router;

//atualiza um equipamento de um jogador
router.put('/jogador/:id_jogador/equipamento/:id_equipamento', [authMiddleware.check], equipamentoController.update);

//deleta um equipamento de um jogador
router.delete('/jogador/:id_jogador/equipamento/:id_equipamento', [authMiddleware.check], equipamentoController.delete);