import express, { Router } from 'express';
import userControllers from '../controllers/user-controllers';
import { checkPermissions } from '../middleware/check-perform';
import { ERoles } from '../enums';

const userRouter: Router = express.Router();

userRouter.route('/').get(userControllers.getAllUsers);
userRouter
  .route('/:id')
  .delete(userControllers.deleteUser, checkPermissions([ERoles.ADMIN]));
userRouter.route('/create').post(userControllers.createUser);
userRouter.route('/login').post(userControllers.login);

export default { userRouter };
