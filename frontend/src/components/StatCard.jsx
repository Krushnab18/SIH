import React from 'react';
import { TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

// Dummy Card components
const Card = ({ children, className }) => <div className={`border rounded-lg p-4 ${className}`}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={`flex items-center justify-between ${className}`}>{children}</div>;
const CardTitle = ({ children, className }) => <h3 className={className}>{children}</h3>;
const CardContent = ({ children, className }) => <div className={className}>{children}</div>;

const StatsCards = () => {
  const stats = [
    {
      title: 'New Issues',
      value: '24',
      description: '+12% from last month',
      icon: AlertCircle,
      color: 'text-yellow-500' // replaced custom Tailwind color
    },
    {
      title: 'Total Issues',
      value: '156',
      description: 'All time submissions',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'In Progress',
      value: '42',
      description: 'Currently being resolved',
      icon: Clock,
      color: 'text-yellow-500'
    },
    {
      title: 'Resolved',
      value: '89',
      description: '+8% from last month',
      icon: CheckCircle2,
      color: 'text-green-500'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <IconComponent className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
