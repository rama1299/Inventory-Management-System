import { Request, Response, NextFunction } from 'express';
import { User, UserRegister, UserLogin, UserModel } from '../models/userModel';
import bcrypt from 'bcrypt'
import { generateToken } from '../helpers/jwt';
export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {

            const dataUser: UserRegister = req.body

            if (!dataUser.username || !dataUser.email || !dataUser.role || !dataUser.password) {
                throw { name: 'InvalidCredentials' }
            }

            if (['staff', 'admin'].includes(dataUser.role)) {
                return res.status(400).json({ message: 'Role must be provided and must be a staff or admin' });
            }

            const existEmail = await UserModel.findByEmail(dataUser.email)

            if (existEmail) {
                return res.status(400).json({ message: 'Email already exist!' })
            }

            const password_hash = await bcrypt.hash(dataUser.password, 10)

            const newUser: User = {
                username: dataUser.username,
                email: dataUser.email,
                password_hash: password_hash,
                role: dataUser.role
            }

            const createUser = await UserModel.createUser(newUser)

            if (!createUser) {
                return res.status(400).json({ message: 'Created user failed!' })
            }

            res.status(201).json({ message: 'Register successfully!' })
        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const dataUser: UserLogin = req.body

            if (!dataUser.email || !dataUser.password) {
                throw { name: 'InvalidCredentials' }
            }

            const existUser = await UserModel.findByEmail(dataUser.email)

            if (!existUser) {
                throw { name: 'InvalidEmailOrPassword' }
            }

            const comparePassword = await bcrypt.compare(dataUser.password, existUser.password_hash)

            if (!comparePassword) {
                throw { name: 'InvalidEmailOrPassword' }
            }

            const token = await generateToken({ id: existUser.id, role: existUser.role })

            res.status(200).json({ token })
        } catch (error) {
            next(error)
        }
    }
}