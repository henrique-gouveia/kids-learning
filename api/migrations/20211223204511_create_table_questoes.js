
exports.up = function(knex, Promise) {
    return knex.schema.createTable('questoes', table => {
        table.increments('id').primary()
        table.integer('arquivoId').references('id').inTable('arquivos').onDelete('SET NULL')
        table.string('tipo', 30).notNull()
        table.string('enunciado', 500).notNull()
        table.binary('texto')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('questoes')
};
