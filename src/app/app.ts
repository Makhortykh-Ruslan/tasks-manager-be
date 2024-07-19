import express from 'express';
import { json } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRouters from '../routes/user-routers';

dotenv.config({ path: './config.env' });

const app = express();

if (process.env.NODDE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(json());
app.use('/api/v1/user', userRouters.userRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'Fail',
    message: `Can't find  ${req.originalUrl} on this server!`,
  });
});

export default app;
