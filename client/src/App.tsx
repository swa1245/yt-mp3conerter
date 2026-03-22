import React, { useState, useEffect, useRef } from 'react';
import { Youtube, Music, Sparkles, AlertCircle, History, Clock } from 'lucide-react';
import { convertUrl, getJobStatus, downloadMp3, JobStatus, Job } from './api/converter';
import UrlInput from './components/UrlInput';
import StatusBadge from './components/StatusBadge';

const App: React.FC = () => {
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const hasAutoDownloaded = useRef<boolean>(false);
  const pollingInterval = useRef<any>(null);

  const handleConvert = async (url: string) => {
    setLoading(true);
    setError(null);
    setJob(null);
    setCurrentJobId(null);
    hasAutoDownloaded.current = false;

    try {
      const { jobId } = await convertUrl(url);
      setCurrentJobId(jobId);
      const initialJob = await getJobStatus(jobId);
      setJob(initialJob);
    } catch (err: unknown) {
      let errorMessage = 'Failed to start conversion. Check your URL.';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null && 'response' in err) {
        const axiosErr = err as { response: { data: { error: string } } };
        errorMessage = axiosErr.response?.data?.error || errorMessage;
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentJobId && job && (job.status === JobStatus.PENDING || job.status === JobStatus.PROCESSING)) {
      setLoading(false);

      pollingInterval.current = setInterval(async () => {
        try {
          const updatedJob = await getJobStatus(currentJobId);
          setJob(updatedJob);

          if (updatedJob.status === JobStatus.DONE || updatedJob.status === JobStatus.FAILED) {
            if (pollingInterval.current) clearInterval(pollingInterval.current);
          }
        } catch (err) {
          console.error('Polling error:', err);
          if (pollingInterval.current) clearInterval(pollingInterval.current);
        }
      }, 2000);

      return () => {
        if (pollingInterval.current) clearInterval(pollingInterval.current);
      };
    }
  }, [currentJobId, job?.status]);

  useEffect(() => {
    if (job?.status === JobStatus.DONE && !hasAutoDownloaded.current && currentJobId) {
      hasAutoDownloaded.current = true;
      downloadMp3(currentJobId);
    }
  }, [job?.status, currentJobId]);

  return (
    <div className="app-container">
      <div className="background-glow glow-1" />
      <div className="background-glow glow-2" />

      <main className="glass-card">
        <header className="header">
          <div className="icon-wrapper">
            <Youtube size={36} />
          </div>
          <h1>
            Audio <span>Forge</span>
          </h1>
          <p>
            High quality YouTube to MP3 converter in seconds.
          </p>
        </header>

        <section className="section-wrapper">
          <UrlInput 
            onConvert={handleConvert} 
            loading={loading} 
            disabled={!!(currentJobId && job && (job.status === JobStatus.PENDING || job.status === JobStatus.PROCESSING))} 
          />

          {error && (
            <div className="alert">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          {job && (
            <div className="job-details">
              <div className="job-header">
                <div className="info">
                  <History size={16} />
                  <span>Job Details</span>
                </div>
                <StatusBadge status={job.status} />
              </div>

              {job.status === JobStatus.FAILED && job.error && (
                <div className="error-message">
                  Error: {job.error}
                </div>
              )}

              {job.status === JobStatus.DONE && (
                <div className="success-message">
                  <p>✅ Conversion complete! Your MP3 has been downloaded automatically.</p>
                  {job.title && <p className="file-title">{job.title}</p>}
                </div>
              )}

              {job.status === JobStatus.PENDING || job.status === JobStatus.PROCESSING ? (
                <div className="processing-state">
                  <div className="icon-container">
                    <Music size={42} className="animate-pulse-slow" />
                  </div>
                  <div className="text">
                    <p className="primary">Forging your high-quality MP3...</p>
                    <p className="secondary">This usually takes about 10-20 seconds.</p>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </section>

        <footer className="footer">
          <div className="features-grid">
            <span className="feature-item highlight-yellow">
              <Sparkles size={14} />
              128kbps HQ
            </span>
            <span className="feature-item highlight-brand">
              <Clock size={14} />
              Instant & Free
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
