import { Request } from 'express';

export interface ITasksRequest extends Request {
  id: string;
}
