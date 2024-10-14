import express, { Router } from 'express';
import tasksControllers from '../controllers/tasks-controllers';
import { checkTaskPermissions, userAuthenticator } from '../middleware';

const tasksRouter: Router = express.Router();

tasksRouter
  .route('/')
  .get(userAuthenticator, tasksControllers.getTasksById)
  .post(userAuthenticator, tasksControllers.createTask);

tasksRouter
  .route('/update')
  .post(userAuthenticator, tasksControllers.updateNote);

tasksRouter
  .route('/:id')
  .delete(userAuthenticator, checkTaskPermissions, tasksControllers.deleteTask);

export default { tasksRouter };
