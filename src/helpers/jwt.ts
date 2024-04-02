import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

export function generateToken(payload: object): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
}

export function verifyToken(token: string): string | object {
    return jwt.verify(token, SECRET_KEY);
}
