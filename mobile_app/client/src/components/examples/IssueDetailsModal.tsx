import { useState } from 'react';
import { Button } from '@/components/ui/button';
import IssueDetailsModal from '../IssueDetailsModal';

export default function IssueDetailsModalExample() {
  const [open, setOpen] = useState(false);
  
  //todo: remove mock functionality
  const mockIssue = {
    id: "1",
    title: "Large Pothole on Main Street",
    description: "This dangerous pothole has been causing significant issues for drivers and pedestrians. Located directly in the main traffic lane near the intersection with Oak Avenue. The hole is approximately 2 feet wide and 8 inches deep, causing vehicle damage and creating a safety hazard for the community.",
    category: "Road Maintenance",
    location: "Main St & Oak Ave",
    status: "inprogress" as const,
    reportedDate: "2 days ago",
    reportedBy: "John Doe",
    imageUrl: undefined
  };

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>View Issue Details</Button>
      <IssueDetailsModal
        issue={mockIssue}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}