import React from 'react';
import { Eye, MessageCircle, Clock } from 'lucide-react';

// Dummy UI components
const Card = ({ children, className }) => <div className={`border rounded-lg ${className}`}>{children}</div>;
const CardHeader = ({ children }) => <div className="border-b px-4 py-2">{children}</div>;
const CardTitle = ({ children, className }) => <h2 className={className}>{children}</h2>;
const CardContent = ({ children, className }) => <div className={className}>{children}</div>;
const Badge = ({ children, className }) => <span className={`px-2 py-1 rounded text-xs ${className}`}>{children}</span>;
const Button = ({ children, className }) => <button className={`px-3 py-1 border rounded flex items-center ${className}`}>{children}</button>;

const RecentPosts = () => {
  const recentIssues = [
    {
      id: 1,
      title: 'Large Pothole on Main Street',
      status: 'In Progress',
      location: 'Main St & Oak Ave',
      time: '2 hours ago',
      category: 'Road Maintenance',
      description: 'Dangerous pothole causing vehicle damage near intersection...',
      comments: 3,
      views: 15
    },
    {
      id: 2,
      title: 'Overflowing Garbage Bins',
      status: 'New',
      location: 'Park Avenue',
      time: '4 hours ago',
      category: 'Garbage Collection',
      description: 'Multiple bins overflowing attracting pests...',
      comments: 1,
      views: 8
    },
    {
      id: 3,
      title: 'Broken Street Light',
      status: 'Resolved',
      location: 'Oak Street',
      time: '1 day ago',
      category: 'Street Lighting',
      description: 'Street light pole damaged and not working...',
      comments: 5,
      views: 23
    },
    {
      id: 4,
      title: 'Graffiti Removal Request',
      status: 'In Progress',
      location: 'Community Center',
      time: '2 days ago',
      category: 'Vandalism',
      description: 'Large graffiti tag on building wall...',
      comments: 2,
      views: 12
    },
  ];

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Posts</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {recentIssues.map((issue) => (
          <div key={issue.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-sm">{issue.title}</h4>
                  <Badge className={`text-xs ${
                    issue.status === 'In Progress' ? 'bg-yellow-500 text-white' :
                    issue.status === 'Resolved' ? 'bg-green-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {issue.status}
                  </Badge>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">{issue.description}</p>

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>📍 {issue.location}</span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {issue.time}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge className="border text-xs">{issue.category}</Badge>

                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {issue.views}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    {issue.comments}
                  </span>
                </div>
              </div>

              <Button className="text-xs h-8 flex items-center border">
                <Eye className="h-3 w-3 mr-1" />
                View Details
              </Button>
            </div>
          </div>
        ))}

        <div className="pt-2">
          <Button className="w-full border">View All Issues</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPosts;
