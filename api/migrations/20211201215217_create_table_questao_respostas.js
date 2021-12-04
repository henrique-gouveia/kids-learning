
exports.up = function(knex, Promise) {
    return knex.schema.createTable('questao_respostas', table => {
        table.integer('questaoId').references('id').inTable('questoes').notNull()
        table.integer('alternativa').notNull()
        table.string('descricao').notNull()
        table.boolean('correta').notNull()
        table.primary(['questaoId', 'alternativa'])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('questao_respostas')
};
