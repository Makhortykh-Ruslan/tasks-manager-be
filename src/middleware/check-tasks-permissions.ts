import { Response, NextFunction } from 'express';
import TaskModel from '../models/task-model';
import { errorResponse } from '../utils';
import { EMessages } from '../enums';
import { IUserRequest } from '../interfaces';
import mongoose from 'mongoose';

interface ICheckTaskPermission extends IUserRequest {
  task?: mongoose.Document;
}

export const checkTaskPermissions = async (
  request: ICheckTaskPermission,
  response: Response,
  next: NextFunction
) => {
  try {
    const task = await TaskModel.findById(request.params.id);

    if (!task) {
      return errorResponse(response, 404, EMessages.TASK_NOT_FOUND);
    }

    if (task.userId.toString() !== request.user._id.toString()) {
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
