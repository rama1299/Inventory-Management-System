import { createPool, Pool } from 'mysql2/promise';
import config from './config'

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = config

export const connection: Pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection.beginTransaction = async () => {
    await connection.query('START TRANSACTION');
};

connection.commit = async () => {
    await connection.query('COMMIT');
};

connection.rollback = async () => {
    await connection.query('ROLLBACK');
};