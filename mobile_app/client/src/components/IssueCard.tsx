import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Eye } from "lucide-react";
import IssueStatusBadge, { type IssueStatus } from "./IssueStatusBadge";

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  imageUrl?: string;
  status: IssueStatus;
  reportedDate: string;
  reportedBy?: string;
}

interface IssueCardProps {
  issue: Issue;
  onViewDetails?: (issueId: string) => void;
}

export default function IssueCard({ issue, onViewDetails }: IssueCardProps) {
  const handleViewDetails = () => {
    console.log('View details clicked for issue:', issue.id);
    onViewDetails?.(issue.id);
  };

  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`card-issue-${issue.id}`}>
      {issue.imageUrl && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img 
            src={issue.imageUrl}
            alt={issue.title}
            className="w-full h-full object-cover"
            data-testid={`img-issue-${issue.id}`}
          />
        </div>
      )}
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-foreground line-clamp-2" data-testid={`text-issue-title-${issue.id}`}>
            {issue.title}
          </h3>
          <IssueStatusBadge status={issue.status} />
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-testid={`text-issue-description-${issue.id}`}>
          {issue.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span data-testid={`text-issue-location-${issue.id}`}>{issue.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span data-testid={`text-issue-date-${issue.id}`}>{issue.reportedDate}</span>
          </div>
        </div>
        
        <div className="inline-block px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md">
          {issue.category}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleViewDetails}
          className="w-full"
          data-testid={`button-view-details-${issue.id}`}
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}