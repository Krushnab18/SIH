import React from 'react';
import { Search, Eye, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Enhanced UI components
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
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-100 text-blue-700"
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const Input = ({ className, ...props }) => (
  <input className={`border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none ${className}`} {...props} />
);

const Select = ({ children, className, ...props }) => (
  <select className={`border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none ${className}`} {...props}>
    {children}
  </select>
);

const Option = ({ children, ...props }) => <option {...props}>{children}</option>;

const Issues = () => {
  const issues = [
    {
      id: 1,
      title: 'Large Pothole on Main Street',
      status: 'In Progress',
      location: 'Main St & Oak Ave',
      time: '2 days ago',
      category: 'Road Maintenance',
      description: 'Dangerous pothole causing vehicle damage near intersection with Oak Avenue. Needs immediate attention.',
    },
    {
      id: 2,
      title: 'Overflowing Garbage Bins',
      status: 'Submitted',
      location: 'Park Avenue',
      time: '1 day ago',
      category: 'Garbage Collection',
      description: 'Multiple bins overflowing on Park Avenue, attracting pests and creating unsanitary conditions.',
    },
    {
      id: 3,
      title: 'Broken Street Light',
      status: 'Resolved',
      location: 'Oak Street',
      time: '5 days ago',
      category: 'Street Lighting',
      description: 'Street light pole damaged and not working, creating safety concerns for pedestrians.',
    },
  ];

  const getStatusVariant = (status) => {
    switch(status) {
      case 'In Progress': return 'warning';
      case 'Resolved': return 'success';
      case 'Submitted': return 'info';
      default: return 'default';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Search & Filters */}
          <div className="space-y-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search issues..." className="pl-10 w-full" />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Select className="flex-1">
                <Option value="all-categories">All Categories</Option>
                <Option value="road-maintenance">Road Maintenance</Option>
                <Option value="garbage-collection">Garbage Collection</Option>
                <Option value="street-lighting">Street Lighting</Option>
              </Select>

              <Select className="flex-1">
                <Option value="all-status">All Status</Option>
                <Option value="submitted">Submitted</Option>
                <Option value="in-progress">In Progress</Option>
                <Option value="resolved">Resolved</Option>
              </Select>
            </div>
          </div>

          {/* Issues List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {issues.map(issue => (
              <Card key={issue.id} hover>
                <CardContent className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-gray-900">{issue.title}</h4>
                    <Badge variant={getStatusVariant(issue.status)}>{issue.status}</Badge>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">{issue.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>📍 {issue.location}</span>
                    <span>📅 {issue.time}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="default">{issue.category}</Badge>
                    <div className="flex space-x-2">
                      <Button variant="ghost" className="px-3 py-1 text-sm">Edit</Button>
                      <Button variant="default" className="px-3 py-1 text-sm flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Issues;
