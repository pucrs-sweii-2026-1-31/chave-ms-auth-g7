import { Request, Response, Router } from 'express';
import Users from '../entities/Users.js';
import { createUser } from '../services/UsersService.js';

const userRouter = Router();

userRouter.post('/sign-up', async (_req: Request, res: Response) => {
    let body = _req.body;
    console.log(body);
    createUser({
        name: body.name,
        birthday: body.birthday,
        email: body.email,
        gender: body.gender,
        password: body.password,
        confirmationPassword: body.confirmationPassword
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

userRouter.put('/save', async (_req: Request, res: Response) => {

});

export { userRouter };