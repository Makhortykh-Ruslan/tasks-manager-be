import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/user-model';
import { Response, NextFunction } from 'express';
import { errorResponse } from '../utils';
import { EMessages } from '../enums';
import { IUserRequest } from '../interfaces';

interface MyJwtPayload extends JwtPayload {
  id?: string;
}

export const userAuthenticator = async (
  request: IUserRequest,
  response: Response,
  next: NextFunction
) => {
  let token;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = request.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as MyJwtPayload;

      const user = await UserModel.findById(decoded.id).select('-password');

      if (!user) {
        return errorResponse(response, 401, EMessages.USER_NOT_FOUND);
      }

      request.user = user;
      next();
    } catch (error) {
      return errorResponse(response, 401, error);
    }
  } else {
    errorResponse(response, 401, EMessages.NOT_AUTHORIZED_NO_TOKEN);
  }
};
