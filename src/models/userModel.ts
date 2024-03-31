import { connection } from "../config/database"

export interface User {
    id: number,
    username: string,
    password_hash: string,
    email: string,
    role: string
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
            console.error('Error executing SQL query:', error);
            return null;
        }
    }

    static async create(user: User): Promise<User | null> {
        try {
            const [rows] = await connection.execute('INSERT INTO user SET ?', user)

            console.log(rows)

            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0] as User;
            }

            return null

        } catch (error) {
            return null
        }
    }
}