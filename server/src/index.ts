import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import convertRouter from './routes/convert';
import './workers/convertWorker'; // Import worker to start it processing

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yrtomp3';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// 1. Middleware
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

// 2. Database Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server after DB connection
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// 3. Routing
app.use('/api', convertRouter);

// Basic health route
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy' });
});

export default app;
