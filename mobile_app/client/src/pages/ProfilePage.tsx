import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Award, Calendar, Settings, LogOut } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import backgroundImage from "@assets/generated_images/Municipal_connectivity_background_84ee0158.png";

export default function ProfilePage() {
  //todo: remove mock functionality
  const userProfile = {
    name: "John Doe",
    email: "john.doe@email.com",
    location: "Downtown District",
    joinedDate: "January 2024",
    reportsSubmitted: 12,
    issuesResolved: 8,
    badgeLevel: "Community Helper"
  };

  const recentActivity = [
    { type: "report", text: "Reported pothole on Main St", date: "2 days ago" },
    { type: "resolved", text: "Street light issue marked resolved", date: "1 week ago" },
    { type: "comment", text: "Added comment to garbage collection issue", date: "2 weeks ago" }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Profile Header with Background */}
      <div className="relative overflow-hidden rounded-lg">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background/90"></div>
        <div className="relative p-6 text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-background">
            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
              {userProfile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-1" data-testid="text-user-name">
            {userProfile.name}
          </h1>
          <p className="text-muted-foreground mb-2" data-testid="text-user-email">
            {userProfile.email}
          </p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm" data-testid="text-user-location">
              {userProfile.location}
            </span>
          </div>
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            <Award className="h-3 w-3 mr-1" />
            {userProfile.badgeLevel}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary" data-testid="stat-user-reports">
              {userProfile.reportsSubmitted}
            </div>
            <div className="text-sm text-muted-foreground">Reports Submitted</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-status-resolved" data-testid="stat-user-resolved">
              {userProfile.issuesResolved}
            </div>
            <div className="text-sm text-muted-foreground">Issues Resolved</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                data-testid={`activity-${index}`}
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === "report" ? "bg-primary" :
                  activity.type === "resolved" ? "bg-status-resolved" :
                  "bg-status-inprogress"
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.text}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Settings className="h-4 w-4" />
              </div>
              <span>Dark Mode</span>
            </div>
            <ThemeToggle />
          </div>
          
          <Button variant="outline" className="w-full" data-testid="button-settings">
            <Settings className="h-4 w-4 mr-2" />
            Account Settings
          </Button>
          
          <Button variant="outline" className="w-full" data-testid="button-logout">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>

      {/* Member Since */}
      <div className="text-center text-sm text-muted-foreground" data-testid="text-member-since">
        Member since {userProfile.joinedDate}
      </div>
    </div>
  );
}