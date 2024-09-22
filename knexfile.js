import dotenv from 'dotenv'

dotenv.config()

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    seeds: {
      directory: 'seeds',
      extension: 'mjs'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: 'seeds',
      extension: 'mjs'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'migrations',
      extension: 'mjs',
    }
  }

};
