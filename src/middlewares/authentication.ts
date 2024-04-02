import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            userSignIn?: TokenPayload;
        }
    }
}

interface TokenPayload {
    id: number,
    role: string
}

const SECRET_KEY = process.env.SECRET_KEY as string;

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Token is required' });
        }

        token = token.split(' ')[1];

        jwt.verify(token, SECRET_KEY, async (err, decoded: any) => {

            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            const user = await UserModel.findById(parseFloat(decoded.id))

            if (!user) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.userSignIn = {
                id: user.id,
                role: user.role
            } as TokenPayload

            next();
        });
    } catch (error) {
        next(error);
    }
};