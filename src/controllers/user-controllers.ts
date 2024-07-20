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

const login = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return errorResponse(
        response,
        400,
        !email ? EMessages.EMAIL_IS_REQUIRED : EMessages.PASSWORD_IS_REQUIRED
      );
    }

    const user: IUser = await UserModel.findOne({ email }).select('+password');

    if (!user) {
      return errorResponse(response, 401, EMessages.INVALID_CREDENTIALS);
    }

    const isPasswordMatch = await user.correctPassword(password, user.password);
    if (!isPasswordMatch) {
      return errorResponse(response, 401, EMessages.PASSWORD_IS_NOT_MATCH);
    }

    const token = generateJwtToken(user._id);

    const model = {
      userName: user.userName,
      email: user.email,
      token,
    };

    return sendResponse(response, 200, model);
  } catch (error) {
    return errorResponse(response, 400, error);
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

export default { createUser, login, deleteUser, getAllUsers };
