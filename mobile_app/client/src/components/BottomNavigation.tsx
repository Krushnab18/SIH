import { Button } from "@/components/ui/button";
import { Home, Plus, FileText, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "report", label: "Report", icon: Plus },
  { id: "my-reports", label: "My Reports", icon: FileText },
  { id: "profile", label: "Profile", icon: User },
];

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border z-40">
      <div className="grid grid-cols-4 gap-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isReportButton = item.id === "report";
          
          return (
            <Button
              key={item.id}
              variant={isActive && !isReportButton ? "default" : isReportButton ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                console.log(`Navigation tab clicked: ${item.id}`);
                onTabChange(item.id);
              }}
              className={`flex flex-col gap-1 h-16 ${
                isReportButton ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
              }`}
              data-testid={`nav-${item.id}`}
            >
              <Icon className={`h-5 w-5 ${isReportButton ? "h-6 w-6" : ""}`} />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}