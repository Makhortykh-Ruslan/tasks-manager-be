import { Response } from 'express';
import { errorResponse, sendResponse } from '../utils';
import TaskModel from '../models/task-model';
import { ICustomUserRequest } from '../interfaces/i-custom-user-request';
import { EMessages } from '../enums';

const createTask = async (
  request: ICustomUserRequest,
  response: Response
): Promise<Response> => {
  try {
    const data = await TaskModel.create({
      ...request.body,
      user: request.user._id,
    });

    return sendResponse(response, 201, data);
  } catch (error) {
    return errorResponse(response, 400, error);
  }
};

const getTasksById = async (
  request: ICustomUserRequest,
  response: Response
): Promise<Response> => {
  try {
    const data = await TaskModel.find({ user: request.user._id });
    return sendResponse(response, 201, data);
  } catch (error) {
    return errorResponse(response, 400, error);
  }
};

const deleteTask = async (
  request: ICustomUserRequest,
  response: Response
): Promise<Response> => {
  await TaskModel.findByIdAndDelete(request.params.id);
  return sendResponse(response, 200, EMessages.TASK_SUCCESSFULLY_DELETED);
};

const updateTask = async (
  request: ICustomUserRequest,
  response: Response
): Promise<Response> => {
  const task = await TaskModel.findByIdAndUpdate(
    request.params.id,
    request.body
  ).lean();
  return sendResponse(response, 200, task, EMessages.TASK_SUCCESSFULLY_UPDATED);
};

export default { createTask, getTasksById, deleteTask, updateTask };
