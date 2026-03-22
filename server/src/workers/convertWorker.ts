import { convertQueue } from '../queues/convertQueue';
import { Job as BullJob } from 'bull';
import Job, { JobStatus } from '../models/Job';
import youtubedl from 'youtube-dl-exec';
import fs from 'fs';
import path from 'path';
// @ts-ignore
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
// @ts-ignore
import ffprobePath from '@ffprobe-installer/ffprobe';

const TEMP_DIR = path.join(process.cwd(), 'temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

convertQueue.process(async (bullJob: BullJob) => {
  const { jobId } = bullJob.data;
  const dbJob = await Job.findById(jobId);

  if (!dbJob) {
    throw new Error(`Job with id ${jobId} not found`);
  }

  try {
    dbJob.status = JobStatus.PROCESSING;
    await dbJob.save();

    console.log(`Job ${jobId}: Fetching info for ${dbJob.url}`);
    
    const info: any = await youtubedl(dbJob.url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: [
        'User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      ],
    });
    
    dbJob.title = info.title || 'Audio Forge Downloader';
    await dbJob.save();

    const outputPath = path.join(TEMP_DIR, `${jobId}.mp3`);

    console.log(`Job ${jobId}: Downloading and converting to MP3 (128kbps)...`);
    
    const ffmpegDir = path.dirname(ffmpegPath.path);
    
    await youtubedl(dbJob.url, {
      extractAudio: true,
      audioFormat: 'mp3',
      audioQuality: 128,
      output: outputPath,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      ffmpegLocation: ffmpegDir,
      addHeader: [
        'User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      ],
    });

    console.log(`Finished processing job ${jobId}`);
    dbJob.status = JobStatus.DONE;
    dbJob.filePath = outputPath;
    await dbJob.save();
  } catch (error: any) {
    const message = error.message || String(error);
    console.error(`Failed job ${jobId}: ${message}`);
    dbJob.status = JobStatus.FAILED;
    dbJob.error = message;
    await dbJob.save();
    throw error;
  }
});
