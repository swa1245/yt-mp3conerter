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

const api = axios.create({
  baseURL: '/api',
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
  window.location.href = `/api/download/${jobId}`;
};
