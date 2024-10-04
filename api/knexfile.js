// Update with your config settings.

module.exports = {
    client: 'postgresql',
    connection: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: process.env.DATABASE_PORT || '5432',
        database: process.env.DATABASE_NAME || 'kids_learning',
        user: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || '123mudar',
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : null
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
}
