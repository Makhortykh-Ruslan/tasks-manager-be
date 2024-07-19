import { Response, NextFunction } from 'express';
import TaskModel from '../models/task-model';
import { ICustomUserRequest } from '../interfaces/i-custom-user-request';
import { errorResponse } from '../utils';
import { EMessages } from '../enums';

export const checkTaskPermissions = async (
  request: ICustomUserRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const task = await TaskModel.findById(request.params.id);

    if (!task) {
      return errorResponse(response, 404, EMessages.TASK_NOT_FOUND);
    }

    if (task.user.toString() !== request.user._id.toString()) {
      return errorResponse(
        response,
        403,
        EMessages.YOU_DO_NOT_HAVE_PERMISSIONS_TO_DELETE_THIS_TASK
      );
    }

    request.task = task;
    next();
  } catch (error) {
    return errorResponse(response, 500, error.message);
  }
};
