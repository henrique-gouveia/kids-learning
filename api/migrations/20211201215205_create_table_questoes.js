
exports.up = function(knex, Promise) {
    return knex.schema.createTable('questoes', table => {
        table.increments('id').primary()
        table.string('tipo', 30).notNull()
        table.string('enunciado', 500).notNull()
        table.binary('texto')
        table.string('imagemUrl', 1000)
        table.string('audioUrl', 1000)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('questoes')
};
