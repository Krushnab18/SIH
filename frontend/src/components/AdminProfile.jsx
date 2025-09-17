import React from 'react';
import { User, Settings, Bell } from 'lucide-react';

// Styled UI components
const Card = ({ children, className = "", hover = false }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''} ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Avatar = ({ children, className = "" }) => (
  <div className={`rounded-full overflow-hidden flex items-center justify-center ${className}`}>{children}</div>
);

const AvatarImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover" />
);

const AvatarFallback = ({ children, className = "" }) => (
  <span className={`text-white ${className}`}>{children}</span>
);

const Button = ({ children, className = "", variant = "default", size = "md", onClick }) => {
  const baseClasses = "font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2";
  const variants = {
    default: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    primary: "bg-green-800 text-white hover:bg-green-900",
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

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    admin: "bg-green-800 text-white",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const AdminProfile = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          {/* Profile Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 bg-green-700 text-white">
              <AvatarImage src="" alt="Admin" />
              <AvatarFallback className="text-lg font-bold">AD</AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-900">Admin User</h2>
              <p className="text-gray-500">admin@civicreport.com</p>
              <Badge variant="admin">Administrator</Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="default" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="default" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProfile;
