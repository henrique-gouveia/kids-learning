exports.up = function(knex, Promise) {
    return knex.schema.createTable('questionarios', table => {
        table.string('id').primary()
        table.integer('turmaId').references('id').inTable('turmas').notNull()
        table.datetime('dataInicio').notNull()
        table.datetime('dataFim').notNull()
        table.integer('quantidadeQuestoes').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('questionarios')
};
