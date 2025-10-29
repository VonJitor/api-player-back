module.exports = {
  type: 'object',
  properties: {
    descricao: { type: 'string' },
    bonus_ataque: { type: 'integer' },
    bonus_defesa: { type: 'integer' },
  },
  required: ['descricao', 'bonus_ataque', 'bonus_defesa'],
    additionalProperties: false,
};