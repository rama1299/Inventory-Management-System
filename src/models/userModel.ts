import { ResultSetHeader } from "mysql2";
import { connection } from "../config/database"

export interface User {
    id?: number,
    username: string,
    password_hash: string,
    email: string,
    role: string
}

export interface UserRegister {
    username: string,
    password: string,
    email: string,
    role: string
}

export interface UserLogin {
    password: string,
    email: string
}

export class UserModel {
    static async findByEmail(email: string): Promise<User | null> {

        try {
            const [rows] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);

            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0] as User;
            }

            return null;
        } catch (error) {
            throw new Error(`Failed to find by email: ${error}`);
        }
    }

    static async createUser(user: User): Promise<User | null> {
        const { username, password_hash, email, role } = user;

        try {
            const [result] = await connection.execute<ResultSetHeader>('INSERT INTO user (username, password_hash, email, role) VALUES (?, ?, ?, ?)', [
                username,
                password_hash,
                email,
                role
            ]);

            if (result.affectedRows == 0) {
                return null
            }

            const newUser: User = {
                id: result.insertId,
                username,
                password_hash,
                email,
                role
            };

            return newUser;
        } catch (error) {
            throw new Error(`Failed to create user: ${error}`);
        }
    }

    static async findById(id: Number): Promise<User | null> {

        try {
            const [rows] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);

            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0] as User;
            }

            return null;
        } catch (error) {
            throw new Error(`Failed to find by id: ${error}`);
        }
    }

}