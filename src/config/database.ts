import { createPool, Pool } from 'mysql2/promise';
import config from './config'

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = config

export let connection: Pool;

export const connectDB = async (): Promise<void> => {
    connection = createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    try {
        await connection.getConnection();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
