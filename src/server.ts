import mongoose from 'mongoose';
import app from '../src/app/app';

const PORT = process.env.PORT || 3000;

const DB = (process.env.DATABASE ?? '').replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD ?? ''
);

mongoose.connect(DB).then(() => console.log('MongoDB connected'));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
