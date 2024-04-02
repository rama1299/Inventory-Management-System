import { connection } from "../config/database"
import { ResultSetHeader } from "mysql2";

export interface Product {
    id?: number,
    name: string,
    description?: string,
    price: string,
    stock_quantity: number,
    image_url: string
}

export interface ProductCreate {
    name: string,
    description?: string,
    price: string,
    stock_quantity: number,
}

export interface ProductUpdate {
    id: number,
    name: string,
    description?: string,
    price: string,
    stock_quantity: number,
}

export interface ProductUpdateImage {
    id: number,
    image_url: string
}

export class ProductModel {
    static async findAll(): Promise<Product[]> {
        try {
            const [rows] = await connection.execute('SELECT * FROM product');
            return rows as Product[];
        } catch (error) {
            throw new Error(`Failed to find all products: ${error}`);
        }
    }

    static async findById(id: Number): Promise<Product | null> {

        try {
            const [rows] = await connection.execute('SELECT * FROM product WHERE id = ?', [id]);

            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0] as Product;
            }

            return null;
        } catch (error) {
            throw new Error(`Failed to find by id: ${error}`);
        }
    }

    static async create(dataProduct: ProductCreate): Promise<ResultSetHeader> {
        const { name, description, price, stock_quantity } = dataProduct

        try {
            const [result] = await connection.execute<ResultSetHeader>('INSERT INTO product (name, description, price, stock_quantity) VALUES (?, ?, ?, ?)', [
                name,
                description,
                price,
                stock_quantity
            ]);

            return result
        } catch (error) {
            throw new Error(`Failed to create products: ${error}`);
        }
    }

    static async update(dataUpdate: ProductUpdate): Promise<ResultSetHeader> {
        try {
            const { id, name, description, price, stock_quantity } = dataUpdate;

            const updateFields = [];

            if (name) updateFields.push(`name = '${name}'`);
            if (description) updateFields.push(`description = '${description}'`);
            if (price) updateFields.push(`price = ${price}`);
            if (stock_quantity) updateFields.push(`stock_quantity = ${stock_quantity}`);

            const updateQuery = `UPDATE product SET ${updateFields.join(', ')} WHERE id = ?`;

            const [result] = await connection.execute<ResultSetHeader>(updateQuery, [id]);

            return result
        } catch (error) {
            throw new Error(`Failed to update product: ${error}`);
        }
    }

    static async updateImageUrl(dataUpdate: ProductUpdateImage) {
        try {
            const [result] = await connection.execute<ResultSetHeader>('UPDATE product SET image_url = ? WHERE id = ?', [dataUpdate.image_url, dataUpdate.id])

            return result
        } catch (error) {
            throw new Error(`Failed to update image product: ${error}`);
        }
    }

    static async delete(id: number): Promise<ResultSetHeader> {
        try {
            const [result] = await connection.execute<ResultSetHeader>('DELETE FROM product WHERE id = ?', [id]);

            return result
        } catch (error) {
            throw new Error(`Failed to update products: ${error}`);
        }
    }
}