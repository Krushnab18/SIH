import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import ReportIssueForm from "@/components/ReportIssueForm";
import IssueDetailsModal from "@/components/IssueDetailsModal";
import HomePage from "@/pages/HomePage";
import MyReportsPage from "@/pages/MyReportsPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/not-found";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { type Issue } from "@/components/IssueCard";

function Router() {
  const [activeTab, setActiveTab] = useState("home");
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showIssueDetails, setShowIssueDetails] = useState(false);

  const handleTabChange = (tab: string) => {
    console.log('Tab changed to:', tab);
    setActiveTab(tab);
    
    if (tab === "report") {
      setShowReportForm(true);
      // Reset to previous tab after showing form
      setTimeout(() => setActiveTab("home"), 100);
    }
  };

  const handleReportIssue = () => {
    console.log('Report issue clicked');
    setShowReportForm(true);
  };

  const handleIssueClick = (issueId: string) => {
    console.log('Issue clicked:', issueId);
    //todo: remove mock functionality - fetch real issue data
    const mockIssue: Issue = {
      id: issueId,
      title: "Sample Issue Details",
      description: "This is a detailed view of the reported issue with all relevant information.",
      category: "Road Maintenance",
      location: "Main Street",
      status: "inprogress",
      reportedDate: "2 days ago",
      reportedBy: "Community Member"
    };
    setSelectedIssue(mockIssue);
    setShowIssueDetails(true);
  };

  const handleReportSubmit = (data: any) => {
    console.log('Report submitted:', data);
    setShowReportForm(false);
    // Show success message or redirect
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentLocation="Downtown District" notificationCount={2} />
      
      <main className="container mx-auto px-4 py-6">
        <Switch>
          <Route path="/my-reports">
            {activeTab === "my-reports" && (
              <MyReportsPage 
                onReportIssue={handleReportIssue}
                onIssueClick={handleIssueClick}
              />
            )}
          </Route>
          
          <Route path="/profile">
            {activeTab === "profile" && <ProfilePage />}
          </Route>
          
          <Route path="/">
            {(activeTab === "home" || activeTab === "report") && (
              <HomePage 
                onReportIssue={handleReportIssue}
                onIssueClick={handleIssueClick}
              />
            )}
          </Route>
          
          <Route component={NotFound} />
        </Switch>

        {/* Render active tab content */}
        {activeTab === "home" && (
          <HomePage 
            onReportIssue={handleReportIssue}
            onIssueClick={handleIssueClick}
          />
        )}
        
        {activeTab === "my-reports" && (
          <MyReportsPage 
            onReportIssue={handleReportIssue}
            onIssueClick={handleIssueClick}
          />
        )}
        
        {activeTab === "profile" && <ProfilePage />}
      </main>

      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />

      {/* Report Issue Modal */}
      <Dialog open={showReportForm} onOpenChange={setShowReportForm}>
        <DialogContent className="max-w-lg h-screen sm:max-h-[90vh] overflow-y-auto p-0">
          <ReportIssueForm 
            onSubmit={handleReportSubmit}
            onCancel={() => setShowReportForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Issue Details Modal */}
      <IssueDetailsModal
        issue={selectedIssue}
        open={showIssueDetails}
        onClose={() => setShowIssueDetails(false)}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;