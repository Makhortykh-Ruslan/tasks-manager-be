import { Request } from 'express';
import mongoose from 'mongoose';

export interface IUserRequest extends Request {
  user?: mongoose.Document;
}
