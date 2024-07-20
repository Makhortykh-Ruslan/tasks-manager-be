import { EMessages, ERoles } from '../enums';
import e, { NextFunction, Response } from 'express';
import { IUser } from '../models';
import { errorResponse } from '../utils';
import { IUserRequest } from '../interfaces';

interface ICheckPermissionsRequest extends IUserRequest {
  user: IUser;
}

interface IResponseCheckPermission {
  (
    request: ICheckPermissionsRequest,
    response: Response,
    next: NextFunction
  ): void | e.Response;
}

export const checkPermissions =
  (roles: ERoles[]): IResponseCheckPermission =>
  (
    request: ICheckPermissionsRequest,
    response: Response,
    next: NextFunction
  ): void | e.Response =>
    roles.includes(request.user.role)
      ? next()
      : errorResponse(
          response,
          403,
          EMessages.YOU_DO_NOT_HAVE_PERMISSIONS_FOR_THIS_ACTION
        );
