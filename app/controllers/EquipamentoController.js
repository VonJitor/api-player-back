const models = require('../models');
const Equipamento = models.equipamento.Equipamento;
const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/equipamento/novoEquipamento.js');
const validacao = ajv.compile(schema);
// Importe a função de localização para pt-BR
const localize = require('ajv-i18n/localize/pt-BR');

class EquipamentoController {
    findByJogador(request, response) {
        Equipamento.findAllByJogadorId(request.params.id_jogador)
            .then((equipamentos) => {
                if (equipamentos && equipamentos.length > 0) {
                    return response.status(200).json(equipamentos);
                }
                return response.status(404).json({ message: 'Nenhum equipamento encontrado para este jogador' });
            })
            .catch((error) => {
                return response.status(500).json({ message: error.message });
            });
    }

    create(request, response) {
        let validacoes = validacao(request.body);
        if (!validacoes) {
            // Aplica a tradução para pt-BR nos erros
            localize(validacao.errors);
            let mensagem = validacao.errors[0].instancePath.replace('/', '');
            mensagem += ' ' + validacao.errors[0].message;
            return response.status(400).json({
                message: mensagem,
            });
        }

        const equipamentoParaCriar = {
            ...request.body,
            id_jogador: request.params.id_jogador,
        };

        Equipamento.create(equipamentoParaCriar)
            .then((novoEquipamento) => {
                return response.status(201).json(novoEquipamento);
            })
            .catch((erro) => {
                return response.status(500).json({ message: 'erro no servidor: ' + erro.message });
            });
    }
    update(request, response) {
        let validacoes = validacao(request.body);
        if (!validacoes) {
            let mensagem = validacao.errors[0].instancePath.replace('/', '');
            mensagem += ' ' + validacao.errors[0].message;
            return response.status(400).json({
                message: mensagem,
            });
        }

        const { id_jogador, id_equipamento } = request.params;

        Equipamento.update(request.body, id_jogador, id_equipamento)
            .then(num => {
                if (num == 1) {
                    Equipamento.findOne(id_jogador, id_equipamento).then(data => {
                        response.send(data);
                    });
                } else {
                    response.send({
                        message: `Não foi possível atualizar o equipamento com id=${id_equipamento}. Talvez o equipamento não foi encontrado ou o req.body está vazio!`
                    });
                }
            })
    }
    delete(request, response) {
        const id_jogador = request.params.id;
        const id_equipamento = request.params.id;
        Equipamento.delete(id_jogador, id_equipamento)
            .then((removido) => {
                if (removido) {
                    return response.status(200).json({
                        message: 'Equipamento excluido com sucesso',
                    });
                } else {
                    return response.status(404).json({
                        message: 'Equipamento nao encontrado',
                    });
                }
            })
            .catch(err => {
                response.status(500).send({
                    message: "Erro ao atualizar o equipamento com id=" + id_equipamento
                });
            });
    }

}



module.exports = new EquipamentoController();