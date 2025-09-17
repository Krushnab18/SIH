import React from 'react';
import { Home, BarChart3, Settings, Users, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Dummy Button component
const Button = ({ children, className }) => (
  <button className={`px-3 py-2 rounded flex items-center w-full ${className}`}>
    {children}
  </button>
);

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Manage Issues', path: '/issues' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-green-200 border-r border-gray-200 h-500 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-green-800">CivicReport Admin</h1>
        <p className="text-sm text-gray-500 mt-1">Management Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;

          return (
            <Link key={item.path} to={item.path}>
              <Button
                className={`justify-start h-11 transition-colors duration-200 ${
                  isActive
                    ? 'bg-green-800 text-white'
                    : 'hover:bg-green-100 text-gray-700'
                }`}
              >
                <IconComponent
                  className={`h-5 w-5 mr-3 ${
                    isActive ? 'text-white' : 'text-green-800'
                  }`}
                />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">© 2024 CivicReport</p>
      </div>
    </div>
  );
};

export default Sidebar;
