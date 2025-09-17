import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle } from "lucide-react";

export type IssueStatus = "submitted" | "inprogress" | "resolved";

interface IssueStatusBadgeProps {
  status: IssueStatus;
  className?: string;
}

const statusConfig = {
  submitted: {
    label: "Submitted",
    icon: Clock,
    className: "bg-status-submitted text-white",
  },
  inprogress: {
    label: "In Progress", 
    icon: AlertCircle,
    className: "bg-status-inprogress text-white",
  },
  resolved: {
    label: "Resolved",
    icon: CheckCircle,
    className: "bg-status-resolved text-white",
  },
} as const;

export default function IssueStatusBadge({ status, className = "" }: IssueStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant="secondary" 
      className={`${config.className} ${className} flex items-center gap-1 px-2 py-1`}
      data-testid={`badge-status-${status}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}