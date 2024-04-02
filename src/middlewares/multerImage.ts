import multer from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, Date.now() + '-' + fileName);
    },
});

export const imageUpload = multer({ storage });