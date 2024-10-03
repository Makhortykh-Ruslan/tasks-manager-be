import { Request, Response } from 'express';
import { errorResponse, generateJwtToken, sendResponse } from '../utils';
import { EMessages } from '../enums';
import { IUser } from '../models';
import UserModel from '../models/user-model';
import sendEmail from '../utils/email';

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

const forgotPassword = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const user = await UserModel.findOne({ email: request.body.email });

  if (!user) {
    return errorResponse(response, 404, EMessages.USER_NOT_FOUND);
  }

  try {
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${request.protocol}://${request.get('host')}/api/v1/auth/resetPassword/${resetToken}`;

    const message = `Hi, if you forgot your password/ you can reset, just click this link ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: 'Your password reset token',
      message,
    });

    return sendResponse(response, 200, {
      message: 'Token was send in your email !!!',
    });
  } catch (error) {
    return errorResponse(response, 400, error);
  }
};

const resetPassword = (request: Request, response: Response): void => {};

export default { login, forgotPassword, resetPassword };
