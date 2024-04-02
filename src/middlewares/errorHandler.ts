import { Request, Response, NextFunction } from 'express';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    console.log(error)

    if (error.name == 'InvalidCredentials') {
        res.status(401).json({ message: 'Invalid credentials!' })
    } else if (error.name == 'InvalidEmailOrPassword') {
        res.status(401).json({ message: 'Invalid email or password!' })
    } else if (error.name == 'ErrorNotFound') {
        res.status(404).json({ message: 'Error not found!' })
    } else {
        res.status(500).json({ message: 'Internal server error!' })
    }
}