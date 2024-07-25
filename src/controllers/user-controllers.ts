import UserModel, { IUser } from '../models/user-model';
import { Response, Request } from 'express';
import { generateJwtToken, errorResponse, sendResponse } from '../utils';
import { EMessages } from '../enums';

const createUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const user: IUser = await UserModel.create(request.body);
    const token = generateJwtToken(user._id);

    return sendResponse(response, 201, { user, token });
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

export default { createUser, deleteUser, getAllUsers };
