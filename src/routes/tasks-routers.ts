import express, { Router } from 'express';
import tasksControllers from '../controllers/tasks-controllers';
import { checkTaskPermissions, userAuthenticator } from '../middleware';

const tasksRouter: Router = express.Router();

tasksRouter
  .route('/')
  .get(userAuthenticator, tasksControllers.getTasksById)
  .post(userAuthenticator, tasksControllers.createTask);

tasksRouter
  .route('/:id')
  .patch(userAuthenticator, checkTaskPermissions, tasksControllers.updateTask)
  .delete(userAuthenticator, checkTaskPermissions, tasksControllers.deleteTask);

export default { tasksRouter };
