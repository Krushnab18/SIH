// src/App.jsx
import React from 'react';
import Sidebar from './components/Sidebar';
import { ChartBarIcon, MapIcon, TicketIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import StatCard from './components/StatCard';
import StatusBadge from './components/StatusBadge';
import { mockIssues } from './data/mockData';

const DashboardContent = () => {
   const stats = [
    { title: "New Reports Today", value: "12", icon: <TicketIcon className="h-6 w-6 text-indigo-600" /> },
    { title: "Total Open Issues", value: "84", icon: <ClockIcon className="h-6 w-6 text-indigo-600" /> },
    { title: "Resolved This Week", value: "56", icon: <CheckCircleIcon className="h-6 w-6 text-indigo-600" /> },
  ];
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard Hub</h1>
        <p className="text-gray-500 mt-1">Real-time overview of civic issues in Pune. Good morning, Archit!</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Issues</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                 <tr className="border-b bg-gray-50">
                    <th className="p-3 text-sm font-semibold text-gray-600">ID</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">Category</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">Location</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">Status</th>
                  </tr>
              </thead>
              <tbody>
                {mockIssues.map(issue => (
                  <tr key={issue.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">{issue.id}</td>
                    <td className="p-3 text-gray-600">{issue.category}</td>
                    <td className="p-3 text-gray-600">{issue.location}</td>
                    <td className="p-3"><StatusBadge status={issue.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <MapIcon className="h-6 w-6 mr-2 text-indigo-600" />
                Issue Hotspots
              </h2>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-500">
                [Map Placeholder]
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <ChartBarIcon className="h-6 w-6 mr-2 text-indigo-600" />
                Category Breakdown
              </h2>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-500">
                [Chart Placeholder]
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <DashboardContent />
      </main>
    </div>
  );
}