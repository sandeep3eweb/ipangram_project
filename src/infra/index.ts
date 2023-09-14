import dotenv from 'dotenv'
import knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import * as path from 'path';


dotenv.config()

const HOST = process.env.DB_HOST || 'localhost'
const NAME = process.env.DB_NAME || 'test'
const USERNAME = process.env.DB_USERNAME || 'root'
const PASSWORD = process.env.DB_PASSWORD || 'root_1234'
const PORT = (process.env.DB_PORT || '3306')
const CLIENT = process.env.CLIENT || 'mysql2'



const temporaryKnex = knex({
    client: CLIENT,
    connection: {
        host: HOST,
        user: USERNAME,
        password: PASSWORD
    }
})

temporaryKnex.raw(`CREATE DATABASE IF NOT EXISTS ${NAME}`)
    .then(() => {
        mainKnexInstance.raw("SELECT 1").then(() => {
            console.log("Database connected Successfully.");
        }).catch((err) => {
            console.log("Error connecting database", err);
        });
    })
    .catch((error) => {
        console.error('Error creating database:', error);
    })
    .finally(() => {
        // Destroy the temporary connection
        temporaryKnex.destroy();
    })


const config: any = {
    client: CLIENT,

    connection: {
        host: HOST,
        port: PORT,
        user: USERNAME,
        password: PASSWORD,
        database: NAME,
    },
    ...knexSnakeCaseMappers(),

    migrations: {
        directory: path.join(__dirname, 'migrations')
    }
}

const mainKnexInstance = knex(config)

mainKnexInstance.raw("SELECT 1").then(() => {
    console.log("Database connected Successfully.");
}).catch((err) => {
    console.log("Error connecting database", err);
});

export default mainKnexInstance