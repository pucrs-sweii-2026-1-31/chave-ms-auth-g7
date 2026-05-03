import { Router } from "express";
import { userRouter } from '../controllers/UsersController.js';
const router = Router();
router.use('/users', userRouter);
export default router;
//# sourceMappingURL=Routes.js.map