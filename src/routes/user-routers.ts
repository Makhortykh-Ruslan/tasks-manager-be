import express, { Router } from 'express';
import userControllers from '../controllers/user-controllers';
import { checkPermissions } from '../middleware/check-perform';
import { ERoles } from '../enums';
import { userAuthenticator } from '../middleware';

const userRouter: Router = express.Router();

userRouter.route('/all').get(userControllers.getAllUsers);
userRouter
  .route('/:id')
  .delete(userControllers.deleteUser, checkPermissions([ERoles.ADMIN]));
userRouter.route('/create').post(userControllers.createUser);
userRouter.route('/me').get(userAuthenticator, userControllers.getMe);

export default { userRouter };
