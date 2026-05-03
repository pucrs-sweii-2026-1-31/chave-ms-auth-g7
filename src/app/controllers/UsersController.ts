import { Request, Response, Router } from 'express';
import Users from '../entities/Users.js';

const userRouter = Router();

userRouter.post('/', async(_req: Request, res: Response) => {
    // const users = await User
});

export { userRouter };