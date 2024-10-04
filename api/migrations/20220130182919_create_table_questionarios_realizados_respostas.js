
exports.up = function(knex) {
    return knex.schema.createTable('questionarios_realizados_respostas', table => {
        table.integer('questionarioRealizadoId').references('id').inTable('questionarios_realizados').notNull()
        table.integer('questaoId').references('id').inTable('questoes').notNull()
        table.boolean('acertou').notNull()
        table.primary(['questionarioRealizadoId', 'questaoId'])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('questionarios_realizados_respostas')
};
