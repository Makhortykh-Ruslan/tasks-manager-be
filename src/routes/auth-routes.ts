import express, { Router } from 'express';
import authControllers from '../controllers/auth-controllers';

const authRouter: Router = express.Router();

authRouter.post('/login', authControllers.login);

export default { authRouter };
