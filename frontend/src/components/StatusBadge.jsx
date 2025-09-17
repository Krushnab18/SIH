// src/components/StatusBadge.jsx
import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    Submitted: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Resolved: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800', // optional extra status
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${
        styles[status] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
