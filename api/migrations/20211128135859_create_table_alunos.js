
exports.up = function (knex, Promise) {
    return knex.schema.createTable('alunos', table => {
        table.increments('id').primary()
        table.integer('turmaId').references('id').inTable('turmas').notNull()
        table.string('matricula').notNull().unique()
        table.string('nome').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('alunos')
};
