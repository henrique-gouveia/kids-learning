
exports.up = function (knex, Promise) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('email').notNull()
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(true)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('usuarios')
};
