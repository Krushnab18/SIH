import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, Clock, CheckCircle } from "lucide-react";
import IssuesList from "@/components/IssuesList";
import { type Issue } from "@/components/IssueCard";

interface MyReportsPageProps {
  onReportIssue: () => void;
  onIssueClick: (issueId: string) => void;
}

export default function MyReportsPage({ onReportIssue, onIssueClick }: MyReportsPageProps) {
  //todo: remove mock functionality
  const mockMyIssues: Issue[] = [
    {
      id: "user-1",
      title: "Pothole on My Street", 
      description: "Large pothole in front of my house causing problems for cars.",
      category: "Road Maintenance",
      location: "123 Oak Street",
      status: "inprogress",
      reportedDate: "3 days ago",
      reportedBy: "Me"
    },
    {
      id: "user-2",
      title: "Broken Sidewalk",
      description: "Cracked sidewalk creating tripping hazard near bus stop.",
      category: "Infrastructure",
      location: "Bus Stop on Pine St",
      status: "submitted", 
      reportedDate: "1 week ago",
      reportedBy: "Me"
    },
    {
      id: "user-3",
      title: "Graffiti on Park Wall",
      description: "Vandalism on the community center wall needs cleaning.",
      category: "Park Maintenance",
      location: "Community Center",
      status: "resolved",
      reportedDate: "2 weeks ago", 
      reportedBy: "Me"
    }
  ];

  const [activeTab, setActiveTab] = useState("all");

  const filteredIssues = mockMyIssues.filter(issue => {
    if (activeTab === "all") return true;
    return issue.status === activeTab;
  });

  const statusCounts = {
    all: mockMyIssues.length,
    submitted: mockMyIssues.filter(issue => issue.status === "submitted").length,
    inprogress: mockMyIssues.filter(issue => issue.status === "inprogress").length,
    resolved: mockMyIssues.filter(issue => issue.status === "resolved").length
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Reports</h1>
          <p className="text-muted-foreground">Track the status of your submitted issues</p>
        </div>
        <Button onClick={onReportIssue} data-testid="button-new-report">
          <Plus className="h-4 w-4 mr-2" />
          New Report
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 mx-auto mb-2 text-foreground" />
            <div className="text-xl font-bold" data-testid="stat-my-total">{statusCounts.all}</div>
            <div className="text-sm text-muted-foreground">Total Reports</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-6 h-6 mx-auto mb-2 rounded-full bg-status-submitted"></div>
            <div className="text-xl font-bold" data-testid="stat-my-submitted">{statusCounts.submitted}</div>
            <div className="text-sm text-muted-foreground">Submitted</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-status-inprogress" />
            <div className="text-xl font-bold" data-testid="stat-my-inprogress">{statusCounts.inprogress}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-status-resolved" />
            <div className="text-xl font-bold" data-testid="stat-my-resolved">{statusCounts.resolved}</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </CardContent>
        </Card>
      </div>

      {/* Reports List with Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Your Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all" data-testid="tab-all">
                All ({statusCounts.all})
              </TabsTrigger>
              <TabsTrigger value="submitted" data-testid="tab-submitted">
                Submitted ({statusCounts.submitted})
              </TabsTrigger>
              <TabsTrigger value="inprogress" data-testid="tab-inprogress">
                In Progress ({statusCounts.inprogress})
              </TabsTrigger>
              <TabsTrigger value="resolved" data-testid="tab-resolved">
                Resolved ({statusCounts.resolved})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              <IssuesList 
                issues={filteredIssues}
                showFilters={false}
                onIssueClick={onIssueClick}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}