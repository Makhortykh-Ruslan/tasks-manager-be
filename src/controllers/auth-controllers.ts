import { Request, Response } from 'express';
import { errorResponse, generateJwtToken, sendResponse } from '../utils';
import { EMessages } from '../enums';
import { IUser } from '../models';
import UserModel from '../models/user-model';

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
      return errorResponse(response, 401, EMessages.USER_NOT_FOUND);
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

export default { login };
