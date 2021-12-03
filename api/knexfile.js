// Update with your config settings.

module.exports = {
    client: 'postgresql',
    connection: {
        database: 'kids_learning',
        user: 'postgres',
        password: 'psql123'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};
