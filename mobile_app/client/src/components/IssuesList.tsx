import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin } from "lucide-react";
import IssueCard, { type Issue } from "./IssueCard";

interface IssuesListProps {
  issues: Issue[];
  showFilters?: boolean;
  onIssueClick?: (issueId: string) => void;
}

export default function IssuesList({ issues, showFilters = true, onIssueClick }: IssuesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const categories = ["all", ...Array.from(new Set(issues.map(issue => issue.category)))];
  const statuses = ["all", "submitted", "inprogress", "resolved"];

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || issue.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    console.log('Search term changed:', value);
  };

  const handleCategoryFilter = (value: string) => {
    setSelectedCategory(value);
    console.log('Category filter changed:', value);
  };

  const handleStatusFilter = (value: string) => {
    setSelectedStatus(value);
    console.log('Status filter changed:', value);
  };

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
              data-testid="input-search-issues"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
              <SelectTrigger className="w-[180px]" data-testid="select-filter-category">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[140px]" data-testid="select-filter-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "all" ? "All Status" : 
                     status === "inprogress" ? "In Progress" : 
                     status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onViewDetails={onIssueClick}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No issues found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
                ? "Try adjusting your filters to see more results."
                : "No issues have been reported in this area yet."}
            </p>
          </div>
        )}
      </div>

      {filteredIssues.length > 0 && (
        <div className="text-center text-sm text-muted-foreground" data-testid="text-results-count">
          Showing {filteredIssues.length} of {issues.length} issues
        </div>
      )}
    </div>
  );
}