import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.JWT_SECRET ?? 'change_me';

export interface AuthRequest extends Request {
    loggedUser?: {
        idUser: number;
        email: string;
        roles: string[];
    };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ status: 401, message: 'Token não fornecido.' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET) as AuthRequest['loggedUser'];
        req.loggedUser = decoded;
        next();
    } catch (_e) {
        res.status(401).json({ status: 401, message: 'Token inválido ou expirado.' });
    }
};
