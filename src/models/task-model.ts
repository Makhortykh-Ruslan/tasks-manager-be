import mongoose, { Schema, model, Document } from 'mongoose';
import { IUser } from './user-model';

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  createdAt: Date;
  user: IUser;
}

const TaskSchema: Schema<ITask> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date },
  status: { type: String, default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const TaskModel = model<ITask>('Task', TaskSchema);

export default TaskModel;
