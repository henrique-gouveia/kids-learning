
exports.up = function(knex) {
    return knex.schema.alterTable('usuarios', table => {
        table.string('email').notNull().unique().alter()
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable('usuarios', table => {
        table.string('email').notNull().alter()
    })
};
