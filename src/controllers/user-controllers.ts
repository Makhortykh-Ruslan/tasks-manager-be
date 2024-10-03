import UserModel, { IUser } from '../models/user-model';
import { Response, Request } from 'express';
import { generateJwtToken, errorResponse, sendResponse } from '../utils';
import { EMessages, ERoles } from '../enums';
import { IUserRequest } from '../interfaces';

const createUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const result = {
      ...request.body,
      role: ERoles.USER,
    };

    const user: IUser = await UserModel.create(result);
    const token = generateJwtToken(user._id);

    return sendResponse(response, 201, { token });
  } catch (error) {
    return errorResponse(response, 400, error.message);
  }
};

const deleteUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    await UserModel.findByIdAndDelete(request.params.id);
    return sendResponse(response, 200, EMessages.USER_WAS_DELETED);
  } catch (error) {
    return errorResponse(response, 400, error);
  }
};

const getAllUsers = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const data = await UserModel.find();
    return sendResponse(response, 200, data);
  } catch (error) {
    return errorResponse(response, 400, error);
  }
};

const getMe = async (
  request: IUserRequest,
  response: Response
): Promise<Response> => {
  try {
    console.log('hello', request.user);

    return sendResponse(response, 200, request.user);
  } catch (error) {
    return errorResponse(response, 400, null);
  }
};

export default { createUser, deleteUser, getAllUsers, getMe };
