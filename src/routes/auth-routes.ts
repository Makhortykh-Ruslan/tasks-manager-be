import express, { Router } from 'express';
import authControllers from '../controllers/auth-controllers';

const authRouter: Router = express.Router();

authRouter.post('/login', authControllers.login);

authRouter.post('/forgotPassword', authControllers.forgotPassword);
authRouter.patch('/resetPassword/:token', authControllers.resetPassword);

export default { authRouter };
