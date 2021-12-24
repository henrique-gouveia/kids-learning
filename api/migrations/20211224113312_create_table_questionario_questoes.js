exports.up = function(knex, Promise) {
    return knex.schema.createTable('questionario_questoes', table => {
        table.increments('id').primary()
        table.string('questionarioId').references('id').inTable('questionarios').notNull()
        table.integer('questaoId').references('id').inTable('questoes').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('questionario_questoes')
};
