import { Response } from 'express';
import { EStatuses } from '../enums';

export const sendResponse = <T>(
  response: Response,
  status: number,
  model: T,
  message?: string
): Response =>
  response.status(status).json({
    status: EStatuses.SUCCESS,
    model,
    message,
  });

export const errorResponse = (
  response: Response,
  status: number,
  message: string
): Response =>
  response.status(status).json({
    status: EStatuses.FAILURE,
    message,
  });
