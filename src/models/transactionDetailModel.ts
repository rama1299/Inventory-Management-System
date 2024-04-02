import { ResultSetHeader } from "mysql2"
import { connection } from "../config/database"

export interface TransactionDetail {
    id?: number
    product_id: number
    quantity: number
    price_unit: number
    total_price: number
}

export interface TransactionDetailJoin {
    id: number,
    quantity: number,
    price_unit: string,
    total_price: string,
    transaction_date: Date,
    customer_id: number,
    customer_name: string,
    customer_address: string,
    product_id: number
    product_name: string,
    product_image_url?: string
}

export interface TransactionDetailCreate {
    transaction_id: number
    product_id: number
    quantity: number
    price_unit: number
    total_price: number
}

export class TransactionDetailModel {
    static async findAll(): Promise<TransactionDetail[]> {
        try {
            const [rows] = await connection.execute('SELECT * FROM transaction_detail')

            return rows as TransactionDetail[]
        } catch (error) {
            throw new Error(`Failed to find all transanction detail: ${error}`)
        }
    }

    static async findById(id: number): Promise<TransactionDetailJoin | null> {
        try {
            const [rows] = await connection.execute(`SELECT td.id, td.quantity, td.price_unit, td.total_price, ts.transaction_date, ts.customer_id, cs.name as customer_name, cs.address as customer_address, td.product_id, pr.name as product_name, pr.image_url as product_image_url
            FROM transaction_detail AS td
            LEFT JOIN product AS pr ON td.product_id = pr.id
            LEFT JOIN transaction AS ts ON td.transaction_id = ts.id
            LEFT JOIN customer AS cs ON ts.customer_id = cs.id
            WHERE td.id = ?;`, [id])

            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0] as TransactionDetailJoin;
            }

            return null;
        } catch (error) {
            throw new Error(`Failed to find by id transanction detail: ${error}`)
        }
    }

    static async existTransactionById(id: number): Promise<TransactionDetail | null> {
        try {
            const [rows] = await connection.execute(`SELECT * FROM transaction_detail WHERE id = ?`, [id])

            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0] as TransactionDetail;
            }

            return null;
        } catch (error) {
            throw new Error(`Failed to check exist transanction detail: ${error}`)
        }
    }

    static async create(dataTransactionDetail: TransactionDetailCreate): Promise<ResultSetHeader> {
        try {
            const { transaction_id, product_id, quantity, price_unit, total_price } = dataTransactionDetail

            const [result] = await connection.execute<ResultSetHeader>('INSERT INTO transaction_detail (transaction_id, product_id, quantity, price_unit, total_price) VALUES (?, ?, ?, ?, ?)', [transaction_id, product_id, quantity, price_unit, total_price])

            return result
        } catch (error) {
            throw new Error(`Failed to create transanction detail: ${error}`)
        }
    }

    static async update(dataUpdate: TransactionDetail): Promise<ResultSetHeader> {
        const { product_id, quantity, price_unit, total_price, id } = dataUpdate
        try {
            const [result] = await connection.execute<ResultSetHeader>('UPDATE transaction_detail SET product_id = ?, quantity = ?, price_unit = ?, total_price = ? WHERE id = ?', [product_id, quantity, price_unit, total_price, id])

            return result
        } catch (error) {
            throw new Error(`Failed to update transanction detail: ${error}`)
        }
    }

    static async delete(id: number): Promise<ResultSetHeader> {
        try {
            const [result] = await connection.execute<ResultSetHeader>('DELETE FROM transaction_detail WHERE id = ?', [id]);

            return result
        } catch (error) {
            throw new Error(`Failed to delete transaction: ${error}`);
        }
    }
}