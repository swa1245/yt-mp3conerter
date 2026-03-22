import React, { useState } from 'react';
import { Link2, Sparkles, Loader2 } from 'lucide-react';

interface UrlInputProps {
  onConvert: (url: string) => void;
  loading: boolean;
  disabled?: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ onConvert, loading, disabled }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (input: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!input) return 'Please enter a YouTube URL';
    if (!youtubeRegex.test(input)) return 'Please enter a valid YouTube URL (youtube.com or youtu.be)';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateUrl(url);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onConvert(url);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="text"
              className={error ? 'error' : ''}
              placeholder="Paste YouTube link here..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              disabled={disabled || loading}
              style={{ paddingLeft: '2.75rem' }}
            />
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '1rem', 
              transform: 'translateY(-50%)', 
              color: '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none'
            }}>
              <Link2 size={20} />
            </div>
          </div>
        </div>
        
        {error && (
          <p style={{ color: '#f87171', fontSize: '0.875rem', paddingLeft: '0.5rem' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={loading || disabled || !url.trim()}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Sparkles size={20} />
          )}
          {loading ? 'Adding to Queue...' : 'Convert to MP3'}
        </button>
      </form>
    </div>
  );
};

export default UrlInput;
