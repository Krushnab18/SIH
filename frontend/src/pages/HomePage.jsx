import React from 'react';
import { BarChart3, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminProfile from '../components/AdminProfile';
import StatsCards from '../components/StatCard';
import RecentPosts from '../components/RecentPosts';
import Header from '../components/Header';

// Helper UI components
const Card = ({ children, className = "", hover = false }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''} ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Button = ({ children, className = "", variant = "default", size = "md", onClick }) => {
  const baseClasses = "font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2";
  const variants = {
    default: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    primary: "bg-green-800 text-white hover:bg-green-900", // dark green
    secondary: "bg-green-800 text-white hover:bg-green-900", // dark green for consistency
  };
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const Home = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8 overflow-auto">
          {/* Admin Profile */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Profile</h2>
            <AdminProfile />
          </section>

          {/* Stats Overview */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics Overview</h2>
            <StatsCards />
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/dashboard">
                <Card hover>
                  <CardContent className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-800 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Go to Dashboard</h3>
                      <p className="text-sm text-gray-500">Access full admin dashboard</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/issues">
                <Card hover>
                  <CardContent className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-800 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Manage Issues</h3>
                      <p className="text-sm text-gray-500">View and manage community issues</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          {/* Recent Posts */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h2>
            <RecentPosts />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
