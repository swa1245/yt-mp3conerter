import express, { Request, Response } from 'express';
import Job, { JobStatus } from '../models/Job';
import { convertQueue } from '../queues/convertQueue';
import fs from 'fs';
import path from 'path';


const router = express.Router();

const YOUTUBE_URL_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;

// POST /api/convert - validate URL, create Job, add to Bull queue, return { jobId }
router.post('/convert', async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || !YOUTUBE_URL_REGEX.test(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL provided' });
  }

  try {
    const dbJob = new Job({
      url,
      status: JobStatus.PENDING,
    });
    await dbJob.save();

    await convertQueue.add({ jobId: dbJob._id });

    return res.json({ jobId: dbJob._id });
  } catch (error: unknown) {
    console.error('Error creating conversion job:', error);
    return res.status(500).json({ error: 'Failed to create conversion job' });
  }
});

// GET /api/status/:jobId - return full job document
router.get('/status/:jobId', async (req: Request, res: Response) => {
  try {
    const dbJob = await Job.findById(req.params.jobId);
    if (!dbJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    return res.json(dbJob);
  } catch (error: unknown) {
    return res.status(500).json({ error: 'Failed to fetch job status' });
  }
});

// GET /api/download/:jobId - stream MP3 as file download, delete file from disk after sending
router.get('/download/:jobId', async (req: Request, res: Response) => {
  try {
    const dbJob = await Job.findById(req.params.jobId);

    if (!dbJob || dbJob.status !== JobStatus.DONE || !dbJob.filePath) {
      return res.status(404).json({ error: 'File not ready or not found' });
    }

    if (!fs.existsSync(dbJob.filePath)) {
      return res.status(404).json({ error: 'File not found on disk' });
    }

    const fileName = `${dbJob.title || 'download'}.mp3`.replace(/[<>:"/\\|?*]/g, '');

    res.download(dbJob.filePath, fileName, (err) => {
      if (err) {
        console.error('Error sending file download:', err);
      } else {
        // Delete file after download
        try {
          if (dbJob.filePath) fs.unlinkSync(dbJob.filePath);
          console.log(`Deleted file for job ${dbJob._id} after download`);
        } catch (unlinkErr) {
          console.error('Error deleting file after download:', unlinkErr);
        }
      }
    });
  } catch (error: unknown) {
    console.error('Download error:', error);
    return res.status(500).json({ error: 'Failed to download file' });
  }
});

export default router;
