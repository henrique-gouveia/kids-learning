
exports.up = function(knex) {
    return knex.schema.alterTable('usuarios', table => {
        table.timestamp('deletedAt')
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable('usuarios', table => {
        table.dropColumn('deletedAt')
    })
};
