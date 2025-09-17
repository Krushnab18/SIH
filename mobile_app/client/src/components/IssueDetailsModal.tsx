import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, User, MessageSquare, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import IssueStatusBadge from "./IssueStatusBadge";
import { type Issue } from "./IssueCard";

interface IssueDetailsModalProps {
  issue: Issue | null;
  open: boolean;
  onClose: () => void;
}

export default function IssueDetailsModal({ issue, open, onClose }: IssueDetailsModalProps) {
  if (!issue) return null;

  const handleClose = () => {
    console.log('Modal closed');
    onClose();
  };

  const handleAddComment = () => {
    console.log('Add comment clicked for issue:', issue.id);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-issue-details">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Issue Details
            <Button size="icon" variant="ghost" onClick={handleClose} data-testid="button-close-modal">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Issue Image */}
          {issue.imageUrl && (
            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
              <img 
                src={issue.imageUrl}
                alt={issue.title}
                className="w-full h-full object-cover"
                data-testid="img-issue-detail"
              />
            </div>
          )}

          {/* Issue Header */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-xl font-semibold" data-testid="text-issue-detail-title">
                {issue.title}
              </h2>
              <IssueStatusBadge status={issue.status} />
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span data-testid="text-issue-detail-location">{issue.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span data-testid="text-issue-detail-date">{issue.reportedDate}</span>
              </div>
              {issue.reportedBy && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span data-testid="text-issue-detail-reporter">{issue.reportedBy}</span>
                </div>
              )}
            </div>

            <Badge variant="secondary" className="w-fit">
              {issue.category}
            </Badge>
          </div>

          {/* Issue Description */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground" data-testid="text-issue-detail-description">
                {issue.description}
              </p>
            </CardContent>
          </Card>

          {/* Status Updates Timeline */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Status Updates</h3>
              <div className="space-y-3">
                {/* Mock status updates - todo: remove mock functionality */}
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-status-resolved rounded-full mt-2"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">Status Updated</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Issue assigned to maintenance team. Work scheduled for tomorrow.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-status-submitted rounded-full mt-2"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">Report Submitted</span>
                      <span className="text-xs text-muted-foreground">{issue.reportedDate}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Issue reported and logged in system for review.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              onClick={handleAddComment}
              className="flex-1"
              data-testid="button-add-comment"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Add Comment
            </Button>
            <Button 
              variant="outline"
              onClick={handleClose}
              data-testid="button-close-details"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}