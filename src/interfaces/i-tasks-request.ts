import { Request } from 'express';
import mongoose from 'mongoose';

export interface ITasksRequest extends Request {
  task?: mongoose.Document;
}
