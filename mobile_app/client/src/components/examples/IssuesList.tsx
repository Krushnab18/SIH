import IssuesList from '../IssuesList';

export default function IssuesListExample() {
  //todo: remove mock functionality
  const mockIssues = [
    {
      id: "1",
      title: "Large Pothole on Main Street",
      description: "Dangerous pothole causing vehicle damage near intersection.",
      category: "Road Maintenance",
      location: "Main St & Oak Ave",
      status: "inprogress" as const,
      reportedDate: "2 days ago",
      reportedBy: "John Doe"
    },
    {
      id: "2", 
      title: "Overflowing Garbage Bins",
      description: "Multiple bins overflowing, attracting pests and causing odors.",
      category: "Garbage Collection",
      location: "Park Avenue",
      status: "submitted" as const,
      reportedDate: "1 day ago",
      reportedBy: "Jane Smith"
    },
    {
      id: "3",
      title: "Broken Street Light",
      description: "Street light has been out for weeks, creating safety hazard.",
      category: "Street Lighting", 
      location: "Elm Street",
      status: "resolved" as const,
      reportedDate: "1 week ago",
      reportedBy: "Mike Johnson"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <IssuesList issues={mockIssues} />
    </div>
  );
}