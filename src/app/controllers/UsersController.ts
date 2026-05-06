import { Request, Response, Router } from 'express';
import Users from '../entities/Users.js';
import { copyRoles, createUser, downgradeRoles, getAllUsers, updateUser } from '../services/UsersService.js';
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

userRouter.get('/all', authMiddleware, async (_req: AuthRequest, res: Response) => {
    getAllUsers()
    .then((users: Users[]) => {
        res.status(200).json(users)
    })
    .catch((error: Error) => {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Erro ao tentar passar suas roles para o novo usuário.",
            error: error.message
        });
    })
});

userRouter.put('/copy-roles', authMiddleware, async (_req: AuthRequest, res: Response) => {
    const { idUser } = _req.body;   
    const idLoggedUser = _req.loggedUser?.idUser;
    if (idLoggedUser === null) {
        res.status(500).json({
            status: 500,
            message: "Erro ao tentar passar suas roles para o novo usuário.",
            error: "Não foi possivel authenticar o seu usuário"
        });
    }

    copyRoles(idUser, idLoggedUser)
    .then((user: Users) => {
        res.status(200).json(user);
    })
    .catch((error: Error) => {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Erro ao tentar passar suas roles para o novo usuário.",
            error: error.message
        });
    })
});

userRouter.put('/downgrade-roles', authMiddleware, async (_req: AuthRequest, res: Response) => {
    const { idUser } = _req.body;

    downgradeRoles(idUser)
    .then((user: Users) => {
        res.status(200).json(user);
    })
    .catch((error: Error) => {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Erro ao tentar remover funções do usuário.",
            error: error.message
        });
    })
});

export { userRouter };