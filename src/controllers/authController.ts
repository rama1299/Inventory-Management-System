import { Request, Response, NextFunction } from 'express';
import { User, UserModel } from '../models/userModel';
import { connection } from '../config/database';

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: User = req.body

            if (!userData.username || !userData.email || !userData.password_hash || !userData.role) {
                throw { name: 'InvalidCredentials' }
            }

            const existEmail: User | null = await UserModel.findByEmail(userData.email)

            if (existEmail) {
                return res.status(400).json({ message: 'Email already exsist!' })
            }

            const newUser: User | null = await UserModel.create(userData)
            console.log(newUser)

        } catch (error) {
            next(error)
        }
    }
}