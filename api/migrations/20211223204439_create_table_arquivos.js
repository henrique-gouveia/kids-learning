
exports.up = function(knex, Promise) {
    return knex.schema.createTable('arquivos', table => {
        table.increments('id').primary()
        table.string('nomeOriginal', 500).notNull()
        table.string('nome',).notNull()
        table.string('tipo', 30).notNull()
        table.integer('tamanho').notNull()
        table.string('url', 1000).notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('arquivos')
};
