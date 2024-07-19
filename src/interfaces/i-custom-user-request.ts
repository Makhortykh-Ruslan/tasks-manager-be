import { Request } from 'express';
import mongoose from 'mongoose';

export interface ICustomUserRequest extends Request {
  user?: mongoose.Document;
  task?: mongoose.Document;
}
