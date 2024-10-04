exports.up = function(knex) {
    return knex.schema.alterTable('questionarios', table => {
        table.date('dataInicio').notNull().alter()
        table.date('dataFim').notNull().alter()
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable('questionarios', table => {
        table.datetime('dataInicio').notNull().alter()
        table.datetime('dataFim').notNull().alter()
    })
};
