import { MapPin, Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  currentLocation?: string;
  notificationCount?: number;
  userName?: string;
}

export default function Header({ 
  currentLocation = "Downtown", 
  notificationCount = 0,
  userName 
}: HeaderProps) {
  return (
    <header className="bg-card border-b border-card-border sticky top-0 z-50">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Button size="icon" variant="ghost" data-testid="button-menu">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium" data-testid="text-location">
              {currentLocation}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="relative"
            data-testid="button-notifications"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                data-testid="badge-notification-count"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
          
          <Button size="icon" variant="ghost" data-testid="button-profile">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="px-4 pb-3">
        <h1 className="text-lg font-semibold text-foreground">
          CivicReport
        </h1>
        <p className="text-sm text-muted-foreground">
          Report and track community issues
        </p>
      </div>
    </header>
  );
}