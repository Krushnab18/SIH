// src/components/StatCard.jsx
import React from 'react';

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-5 rounded-xl shadow">
    <div className="flex items-center space-x-4">
      <div className="bg-indigo-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);
export default StatCard;