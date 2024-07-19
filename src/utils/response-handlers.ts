import { Response } from 'express';
import { EStatuses } from '../enums';

export const sendResponse = <T>(
  response: Response,
  status: number,
  model: T
): Response =>
    response.status(status).json({
      status: EStatuses.SUCCESS,
      model,
    });

export const errorResponse = (
  response: Response,
  status: number,
  error: any
): Response =>
  response.status(status).json({
    status: EStatuses.FAILURE,
    message: error.message,
  });
