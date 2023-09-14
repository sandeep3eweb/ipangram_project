import type { Knex } from "knex";
import { knexSnakeCaseMappers } from "objection";
import path from "path";
import dotenv from 'dotenv';

// Update with your config settings.
dotenv.config()

const HOST = process.env.DB_HOST || '127.0.0.1'
const NAME = process.env.DB_NAME || 'ipangram'
const USERNAME = process.env.DB_USERNAME || 'root'
const PASSWORD = process.env.DB_PASSWORD || 'root_1234'
const PORT = Number((process.env.DB_PORT || '3306'))
const CLIENT = process.env.CLIENT || 'mysql2'


const config: { [key: string]: Knex.Config } = {
  development: {
    client: CLIENT,
    connection: {
      host: HOST,
      port: PORT,
      user: USERNAME,
      password: PASSWORD,
      database: NAME
    },
    ...knexSnakeCaseMappers(),
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  }
}

module.exports = config;
