import { Request, Response, NextFunction } from 'express';

export const authorization = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {

            if (!req.userSignIn || !roles.includes(req.userSignIn.role)) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};