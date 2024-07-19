import express, { Router } from 'express';
import userControllers from '../controllers/user-controllers';

const userRouter: Router = express.Router();

userRouter.route('/').get(userControllers.getAllUsers);
userRouter.route('/:id').delete(userControllers.deleteUser);
userRouter.route('/create').post(userControllers.createUser);
userRouter.route('/login').post(userControllers.login);

export default { userRouter };
