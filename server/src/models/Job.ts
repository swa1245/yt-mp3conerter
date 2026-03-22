import mongoose, { Schema, Document } from 'mongoose';

export enum JobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  DONE = 'done',
  FAILED = 'failed',
}

export interface IJob extends Document {
  url: string;
  status: JobStatus;
  filePath?: string;
  title?: string;
  error?: string;
  createdAt: Date;
}

const JobSchema: Schema = new Schema({
  url: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(JobStatus),
    default: JobStatus.PENDING,
  },
  filePath: { type: String },
  title: { type: String },
  error: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IJob>('Job', JobSchema);
