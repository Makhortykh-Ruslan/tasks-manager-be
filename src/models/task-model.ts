import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  createdAt: Date;
  userId: string;
}

const TaskSchema: Schema<ITask> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date },
  status: { type: String, default: 'active' },
  userId: { type: String, required: true },
});

const TaskModel = model<ITask>('Task', TaskSchema);

export default TaskModel;
