import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, TrendingUp, Users, Clock } from "lucide-react";
import IssuesList from "@/components/IssuesList";
import { type Issue } from "@/components/IssueCard";
import heroImage from "@assets/generated_images/Civic_app_hero_illustration_56454161.png";

interface HomePageProps {
  onReportIssue: () => void;
  onIssueClick: (issueId: string) => void;
}

export default function HomePage({ onReportIssue, onIssueClick }: HomePageProps) {
  //todo: remove mock functionality
  const mockIssues: Issue[] = [
    {
      id: "1",
      title: "Large Pothole on Main Street",
      description: "Dangerous pothole causing vehicle damage near intersection with Oak Avenue. Needs immediate attention.",
      category: "Road Maintenance",
      location: "Main St & Oak Ave",
      status: "inprogress",
      reportedDate: "2 days ago",
      reportedBy: "John Doe"
    },
    {
      id: "2",
      title: "Overflowing Garbage Bins",
      description: "Multiple bins overflowing on Park Avenue, attracting pests and creating unsanitary conditions.",
      category: "Garbage Collection",
      location: "Park Avenue",
      status: "submitted",
      reportedDate: "1 day ago",
      reportedBy: "Jane Smith"
    },
    {
      id: "3",
      title: "Broken Street Light",
      description: "Street light has been out for weeks on Elm Street, creating safety hazard for pedestrians.",
      category: "Street Lighting",
      location: "Elm Street",
      status: "resolved",
      reportedDate: "1 week ago",
      reportedBy: "Mike Johnson"
    },
    {
      id: "4",
      title: "Damaged Park Bench",
      description: "Park bench broken and unsafe for use. Wood is splintered and could cause injury.",
      category: "Park Maintenance",
      location: "Central Park",
      status: "submitted",
      reportedDate: "3 days ago",
      reportedBy: "Sarah Wilson"
    }
  ];

  const stats = {
    totalIssues: mockIssues.length,
    inProgress: mockIssues.filter(issue => issue.status === "inprogress").length,
    resolved: mockIssues.filter(issue => issue.status === "resolved").length
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        <div className="relative p-6 text-center">
          <div className="w-full max-w-md mx-auto mb-4">
            <img 
              src={heroImage} 
              alt="Civic Reporting Hero"
              className="w-full h-32 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">Make Your Community Better</h1>
          <p className="text-muted-foreground mb-4">
            Report issues, track progress, and help improve your neighborhood
          </p>
          <Button 
            size="lg" 
            onClick={onReportIssue}
            data-testid="button-hero-report"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="h-5 w-5 mr-2" />
            Report an Issue
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-1 text-primary" />
            <div className="text-lg font-bold" data-testid="stat-total-issues">{stats.totalIssues}</div>
            <div className="text-xs text-muted-foreground">Total Issues</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 text-center">
            <Clock className="h-6 w-6 mx-auto mb-1 text-status-inprogress" />
            <div className="text-lg font-bold" data-testid="stat-in-progress">{stats.inProgress}</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 text-center">
            <Users className="h-6 w-6 mx-auto mb-1 text-status-resolved" />
            <div className="text-lg font-bold" data-testid="stat-resolved">{stats.resolved}</div>
            <div className="text-xs text-muted-foreground">Resolved</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Issues in Your Area</CardTitle>
        </CardHeader>
        <CardContent>
          <IssuesList 
            issues={mockIssues} 
            onIssueClick={onIssueClick}
          />
        </CardContent>
      </Card>
    </div>
  );
}