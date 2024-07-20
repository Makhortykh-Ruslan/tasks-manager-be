import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { ERoles } from '../enums';

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
  role: ERoles;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ERoles,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.correctPassword = async (
  candidatePassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
