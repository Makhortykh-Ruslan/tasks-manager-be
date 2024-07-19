import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const generateJwtToken = (
  userId: Types.ObjectId,
  secret: string = process.env.JWT_SECRET ?? '',
  expiresIn: string = process.env.JWT_EXPIRES_IN ?? '1d'
): string => jwt.sign({ id: userId }, secret, { expiresIn });
