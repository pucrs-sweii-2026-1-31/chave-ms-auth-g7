import { Request, Response, Router } from 'express';
import Users from '../entities/Users.js';
import { login, generateJWT } from '../services/AuthService.js';
import Roles from '../entities/Roles.js';
import { loginLimiter } from '../middlewares/rateLimiter.js';

const authRouter = Router();

authRouter.post('/login', loginLimiter, async (_req: Request, res: Response) => {
    const { email, password } = _req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    login(email, password)
    .then((user: Users) => {
        let token = generateJWT(user);
        res.status(200).json({
            email: user.email,
            roles: user.roles.map((role: Roles) => role.name),
            token: token
        });
    })
    .catch((error: Error) => {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Erro ao tentar criar um novo usuário.",
            error: error.message
        });
    })

});

export { authRouter };