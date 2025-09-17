import React from 'react';
import { BarChart3, Users, FileText, Settings, TrendingUp, MapPin, Clock, CheckCircle, AlertCircle, Plus, Bell } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Card, Button, Badge components (enhanced)
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
    primary: "bg-green-800 text-white hover:bg-green-900",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
  };
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-800 text-green-100",
    warning: "bg-orange-100 text-orange-700",
    info: "bg-blue-100 text-blue-700"
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

// StatCard component
const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
  <Card hover className="relative overflow-hidden">
    <CardContent>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      {trend && <div className="mt-4 flex items-center text-sm text-green-600"><TrendingUp className="h-4 w-4 mr-1" />{trend}</div>}
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const stats = [
    { title: 'Total Reports', value: '247', subtitle: 'This month', icon: FileText, color: 'bg-green-700', trend: '+12% from last month' },
    { title: 'Active Issues', value: '23', subtitle: 'In progress', icon: Clock, color: 'bg-orange-500' },
    { title: 'Resolved Today', value: '8', subtitle: 'Completed', icon: CheckCircle, color: 'bg-green-800', trend: '+2 from yesterday' },
    { title: 'Users Online', value: '156', subtitle: 'Active now', icon: Users, color: 'bg-slate-600' },
  ];

  const quickActions = [
    { title: 'Manage Issues', description: 'View, assign, and resolve community issues', icon: FileText, color: 'bg-blue-500', primary: true },
    { title: 'User Management', description: 'Manage user accounts and permissions', icon: Users, color: 'bg-green-500' },
    { title: 'Analytics', description: 'View detailed reports and analytics', icon: TrendingUp, color: 'bg-purple-500' },
    { title: 'System Settings', description: 'Configure system preferences', icon: Settings, color: 'bg-orange-500' },
  ];

  const recentActivity = [
    { action: 'New issue reported: Pothole on Main St', time: '5 min ago', type: 'new' },
    { action: 'Issue resolved: Broken streetlight on Oak Ave', time: '1 hour ago', type: 'resolved' },
    { action: 'User registered: john.doe@email.com', time: '2 hours ago', type: 'user' },
    { action: 'Issue updated: Garbage collection on Park St', time: '3 hours ago', type: 'update' },
  ];

  const getActivityColor = (type) => {
    switch(type) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'update': return 'bg-orange-100 text-orange-600';
      case 'user': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        
  <Header />

        {/* Main Content */}
        <main className="p-6 space-y-8">
          {/* Stats Overview */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => <StatCard key={idx} {...stat} />)}
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, idx) => {
                const IconComponent = action.icon;
                return (
                  <Card key={idx} hover className="cursor-pointer group">
                    <CardContent>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${action.color} group-hover:scale-105 transition-transform duration-200`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        {action.primary && <Badge variant="success">Primary</Badge>}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                      <Button variant={action.primary ? "primary" : "default"} className="w-full mt-4">
                        {action.primary ? 'Create' : 'Open'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="space-y-4 p-4">
                {recentActivity.map((act, idx) => (
                  <div key={idx} className="flex items-center space-x-3 py-2">
                    <div className={`w-2 h-2 rounded-full ${getActivityColor(act.type)}`} />
                    <div className="flex-1">
                      <p className="text-sm">{act.action}</p>
                      <p className="text-xs text-gray-500">{act.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
