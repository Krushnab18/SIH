// src/components/StatusBadge.jsx
import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    Submitted: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Resolved: 'bg-green-100 text-green-800',
  };
  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
};
export default StatusBadge;