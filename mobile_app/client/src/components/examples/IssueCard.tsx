import IssueCard from '../IssueCard';

export default function IssueCardExample() {
  const mockIssue = {
    id: "1",
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues and potential vehicle damage. Located near the intersection with Oak Avenue.",
    category: "Road Maintenance",
    location: "Main St & Oak Ave",
    status: "inprogress" as const,
    reportedDate: "2 days ago",
    reportedBy: "John Doe"
  };

  return (
    <div className="w-80">
      <IssueCard issue={mockIssue} />
    </div>
  );
}