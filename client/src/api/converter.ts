import axios from 'axios';

export enum JobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  DONE = 'done',
  FAILED = 'failed',
}

export interface Job {
  _id: string;
  url: string;
  status: JobStatus;
  title?: string;
  error?: string;
  createdAt: string;
}

export interface ConvertResponse {
  jobId: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

export const convertUrl = async (url: string): Promise<ConvertResponse> => {
  const { data } = await api.post<ConvertResponse>('/convert', { url });
  return data;
};

export const getJobStatus = async (jobId: string): Promise<Job> => {
  const { data } = await api.get<Job>(`/status/${jobId}`);
  return data;
};

export const downloadMp3 = (jobId: string) => {
  // Use professional direct URL approach for downloading
  window.location.href = `${API_URL}/api/download/${jobId}`;
};
