import IssueStatusBadge from '../IssueStatusBadge';

export default function IssueStatusBadgeExample() {
  return (
    <div className="flex gap-2">
      <IssueStatusBadge status="submitted" />
      <IssueStatusBadge status="inprogress" />
      <IssueStatusBadge status="resolved" />
    </div>
  );
}