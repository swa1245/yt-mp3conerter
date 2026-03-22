import React from 'react';
import { Download, Music } from 'lucide-react';
import { JobStatus } from '../api/converter';

interface DownloadButtonProps {
  status: JobStatus;
  jobId: string;
  onDownload: (jobId: string) => void;
  title?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ status, jobId, onDownload, title }) => {
  if (status !== JobStatus.DONE) return null;

  return (
    <div className="download-section">
      <div className="download-card">
        <div className="file-icon">
          <Music size={20} />
        </div>
        <div className="file-info">
          <p className="file-title">
            {title || 'Ready to download'}
          </p>
          <p className="file-meta">128kbps • MP3 High Quality</p>
        </div>
      </div>
      
      <button
        onClick={() => onDownload(jobId)}
        className="btn-primary"
      >
        <Download size={20} />
        Download MP3 Now
      </button>
    </div>
  );
};

export default DownloadButton;
