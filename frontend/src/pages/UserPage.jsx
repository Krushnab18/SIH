import React from 'react';
import { Search, User, Eye, Plus, Settings } from 'lucide-react';
import Sidebar from '../components/Sidebar';

// UI Components (same as Dashboard/Issues for consistency)
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
    admin: "bg-green-800 text-green-100",
    moderator: "bg-blue-600 text-white",
    user: "bg-gray-200 text-gray-800"
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

const Users = () => {
  // Sample user data
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob.smith@example.com", role: "Moderator", status: "Active" },
    { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", role: "User", status: "Inactive" },
    { id: 4, name: "Diana Prince", email: "diana.prince@example.com", role: "User", status: "Active" },
  ];

  const getRoleVariant = (role) => {
    switch (role) {
      case "Admin": return "admin";
      case "Moderator": return "moderator";
      default: return "user";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
            <p className="text-gray-600 mt-1">View, edit, and manage user accounts</p>
          </div>
          <Button variant="primary" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Search */}
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search users..." className="pl-10 w-full" />
          </div>

          {/* Users List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {users.map(user => (
              <Card key={user.id} hover>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <User className="h-6 w-6 text-gray-500" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <Badge variant={getRoleVariant(user.role)}>{user.role}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${user.status === "Active" ? "text-green-600" : "text-gray-400"}`}>{user.status}</span>
                    <div className="flex space-x-2">
                      <Button variant="ghost" className="px-3 py-1 text-sm flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="default" className="px-3 py-1 text-sm flex items-center">
                        <Settings className="h-4 w-4 mr-1" />
                        Edit
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

export default Users;
