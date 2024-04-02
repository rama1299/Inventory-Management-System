import { connection } from "../config/database"
import { ResultSetHeader } from "mysql2"

export interface Transaction {
    id: number,
    customer_id: number,
    transaction_date: Date,
    total_price: number
}

export interface TransactionsCustomer {
    id: number,
    transaction_date: Date,
    customer_id: number,
    name: string,
}

export interface TransactionCustomer {
    id: number,
    transaction_date: Date,
    customer_id: number,
    name: string,
    email: string,
    phone_number: string,
    address: string
}

export interface TransactionCreate {
    customer_id: number,
    transaction_date: Date
}

export class TransactionModel {
    static async findAll(): Promise<TransactionsCustomer[]> {
        try {
            const [rows] = await connection.execute('SELECT ts.id, ts.transaction_date, ts.customer_id, cs.name FROM transaction AS ts LEFT JOIN customer AS cs ON ts.customer_id = cs.id;')

            return rows as TransactionsCustomer[]
        } catch (error) {
            throw new Error(`Failed to find all transaction: ${error}`);
        }
    }

    static async findById(id: number): Promise<TransactionCustomer | null> {
        try {
            let rows;
            [rows] = await connection.execute(`SELECT ts.id, ts.transaction_date, ts.customer_id, cs.name, cs.email, cs.phone_number, cs.address
                FROM transaction AS ts
                LEFT JOIN customer AS cs ON ts.customer_id = cs.id
                WHERE ts.id = ?;`,
                [id])

            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0] as any;
            }

            return null;
        } catch (error) {
            throw new Error(`Failed to find by id transaction: ${error}`);
        }
    }

    static async create(dataTransaction: TransactionCreate): Promise<ResultSetHeader> {
        try {
            const { customer_id, transaction_date } = dataTransaction

            const [result] = await connection.execute<ResultSetHeader>('INSERT INTO transaction (customer_id, transaction_date) VALUES (?, ?)', [customer_id, transaction_date])

            return result
        } catch (error) {
            throw new Error(`Failed to create transanction: ${error}`)
        }
    }

    static async update(id: number, newCustomer_id: number): Promise<ResultSetHeader> {
        try {
            const [result] = await connection.execute<ResultSetHeader>('UPDATE transaction SET customer_id = ? WHERE id = ?', [newCustomer_id, id])

            return result
        } catch (error) {
            throw new Error(`Failed to update transanction: ${error}`)

        }
    }

    static async delete(id: number): Promise<ResultSetHeader> {
        try {
            const [result] = await connection.execute<ResultSetHeader>('DELETE FROM transaction WHERE id = ?', [id]);

            return result
        } catch (error) {
            throw new Error(`Failed to delete transaction: ${error}`);
        }
    }
}