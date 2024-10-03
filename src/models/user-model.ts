import { Schema, model, Document } from 'mongoose';
import crypto from 'crypto';
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
  createPasswordResetToken(): string;
  passwordResetToken: string;
  passwordResetExpires: Date;
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
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
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

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
