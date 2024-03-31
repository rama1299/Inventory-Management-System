import { Request, Response, NextFunction } from 'express';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    console.log(error)

    if (error.name == 'InvalidCredentials') {
        res.status(400).json({ message: 'Invalis credentials!' })
    } else {
        res.status(500).json({ message: 'Internal server error!' })
    }
}