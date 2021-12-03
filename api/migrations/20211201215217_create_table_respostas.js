
exports.up = function(knex, Promise) {
    return knex.schema.createTable('respostas', table => {
        table.integer('questaoId').references('id').inTable('questoes').notNull()
        table.integer('alternativa').notNull()
        table.string('descricao').notNull()
        table.primary(['questaoId', 'alternativa'])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('respostas')
};
