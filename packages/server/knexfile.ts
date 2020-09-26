import path from 'path'
import { dbName, dbUser, dbPassword } from '@rp-2/dotenv'

const dbConfig = {
  development: {
    client: 'pg',
    connection: {
      database: dbName,
      user: dbUser,
      password: dbPassword,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: dbName,
      user: dbUser,
      password: dbPassword,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}

module.exports = dbConfig
export default dbConfig
