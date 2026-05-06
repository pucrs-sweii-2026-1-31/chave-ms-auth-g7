import { Request, Response, Router } from 'express';
import Users from '../entities/Users.js';
import { createUser, updateUser } from '../services/UsersService.js';
import { signUpLimiter } from '../middlewares/rateLimiter.js';
import { authMiddleware, AuthRequest } from '../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.post('/sign-up', signUpLimiter, async (_req: Request, res: Response) => {
    let {
        name, 
        birthday, 
        email, 
        gender, 
        password, 
        confirmationPassword
    } = _req.body;
    createUser({
        name: name,
        birthday: birthday,
        email: email,
        gender: gender,
        password: password,
        confirmationPassword: confirmationPassword
    }).then((user: Users) => {
        res.status(200).json(user);
    }).catch((error: Error) => {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Erro ao tentar criar um novo usuário.",
            error: error.message
        });
    })
    
});

userRouter.put('/save', authMiddleware, async (_req: AuthRequest, res: Response) => {
    const { name, birthday, gender, email } = _req.body;
    updateUser(_req.loggedUser!.idUser, { name, birthday, gender, email })
        .then((user: Users) => {
            res.status(200).json(user);
        })
        .catch((error: Error) => {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: "Erro ao tentar atualizar o usuário.",
                error: error.message
            });
        });
});

export { userRouter };