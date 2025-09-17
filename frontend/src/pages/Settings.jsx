import React from 'react';
import { Settings, Bell, User, Lock } from 'lucide-react';
import Sidebar from '../components/Sidebar';

// Dummy UI components (matching Dashboard/Issues/Users)
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

const Input = ({ className = "", ...props }) => (
  <input className={`border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none ${className}`} {...props} />
);

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${enabled ? 'bg-green-600' : 'bg-gray-300'}`}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-gray-700" />
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>
          <Button variant="primary">Save Changes</Button>
        </header>

        <main className="flex-1 p-6 space-y-6">
          {/* Account Settings */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
            <Card hover>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <User className="h-5 w-5 text-gray-500" />
                  <Input placeholder="Full Name" defaultValue="Admin User" className="flex-1" />
                </div>
                <div className="flex items-center gap-4">
                  <Lock className="h-5 w-5 text-gray-500" />
                  <Input placeholder="Change Password" type="password" className="flex-1" />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Notifications Settings */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
            <Card hover>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Enable Notifications</span>
                  <Toggle
                    enabled={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Email Notifications</span>
                  <Toggle
                    enabled={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* System Settings */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h2>
            <Card hover>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Time Zone</span>
                  <select className="border border-gray-300 rounded-lg px-3 py-2">
                    <option>UTC -08:00 Pacific Time</option>
                    <option>UTC -05:00 Eastern Time</option>
                    <option>UTC +00:00 Greenwich Mean Time</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Language</span>
                  <select className="border border-gray-300 rounded-lg px-3 py-2">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
