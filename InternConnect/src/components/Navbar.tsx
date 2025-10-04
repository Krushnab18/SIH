import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { GraduationCap, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavLinks = () => {
    if (!user) return [];

    switch (user.role) {
      case 'student':
        return [
          { to: '/student', label: 'Dashboard' },
          { to: '/student/applications', label: 'Applications' },
          { to: '/student/logbook', label: 'Logbook' },
          { to: '/student/reports', label: 'Weekly Reports' },
          { to: '/student/communication', label: 'Mentors' },
          { to: '/student/prep', label: 'Prep' },
          { to: '/student/mentor', label: 'AI Mentor' },
          { to: '/student/profile', label: 'Profile' },
        ];
      case 'faculty':
        return [
          { to: '/faculty', label: 'Dashboard' },
          { to: '/faculty/listings', label: 'Listings' },
          { to: '/faculty/students', label: 'Students' },
          { to: '/faculty/reports', label: 'Reports & Analytics' },
          { to: '/faculty/chat', label: 'Messages' },
        ];
      case 'industry':
        return [
          { to: '/industry', label: 'Dashboard' },
          { to: '/industry/listings', label: 'My Listings' },
          { to: '/industry/applicants', label: 'Applicants' },
          { to: '/industry/evaluations', label: 'Evaluations' },
          { to: '/industry/chat', label: 'Messages' },
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">InternConnect</span>
          </Link>

          {user && (
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-1">
                {getNavLinks().map((link) => (
                  <Link key={link.to} to={link.to}>
                    <Button
                      variant={location.pathname === link.to ? 'default' : 'ghost'}
                      className="transition-smooth"
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-primary capitalize">{user.role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
