exports.up = function(knex, Promise) {
    return knex.schema.createTable('questionarios_realizados', table => {
        table.increments('id').primary()
        table.string('questionarioId').references('id').inTable('questionarios').notNull()
        table.integer('alunoId').references('id').inTable('alunos').notNull()
        table.datetime('data').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('questionarios_realizados')
};
