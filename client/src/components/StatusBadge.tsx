import React from 'react';
import { JobStatus } from '../api/converter';
import { CheckCircle2, Clock, Loader2, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: JobStatus;
}

const statusConfig = {
  [JobStatus.PENDING]: {
    label: 'Pending',
    className: 'pending',
    icon: <Clock size={16} />,
  },
  [JobStatus.PROCESSING]: {
    label: 'Processing',
    className: 'processing',
    icon: <Loader2 size={16} className="animate-spin" />,
  },
  [JobStatus.DONE]: {
    label: 'Done',
    className: 'done',
    icon: <CheckCircle2 size={16} />,
  },
  [JobStatus.FAILED]: {
    label: 'Failed',
    className: 'failed',
    icon: <AlertCircle size={16} />,
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];

  return (
    <div className={`status-badge ${config.className}`}>
      {config.icon}
      <span>{config.label}</span>
      {status === JobStatus.PROCESSING && <span className="pulse-dot" />}
    </div>
  );
};

export default StatusBadge;
