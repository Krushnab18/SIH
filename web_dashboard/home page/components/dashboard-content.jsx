"use client"
import {
  UserIcon,
  FileTextIcon,
  AlertCircleIcon,
  BarChart3Icon,
  LayoutDashboardIcon,
  CalendarIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  HashIcon,
  SearchIcon,
  FilterIcon,
  PlusIcon,
  EditIcon,
} from "./icons"

// Remove TypeScript interface and use plain props
export function DashboardContent(props) {
  const { activeSection } = props

  const arr = [
    {
      id: "#ISS-001",
      title: "Water main break on Elm Street",
      priority: "High",
      status: "In Progress",
      assignee: "John Smith",
      reported: "2024-01-15",
      reporter: "City Resident",
    },
    {
      id: "#ISS-002",
      title: "Traffic light malfunction at intersection",
      priority: "High",
      status: "Open",
      assignee: "Unassigned",
      reported: "2024-01-14",
      reporter: "Traffic Dept",
    },
    {
      id: "#ISS-003",
      title: "Park bench vandalism report",
      priority: "Medium",
      status: "Resolved",
      assignee: "Mike Johnson",
      reported: "2024-01-13",
      reporter: "Park Visitor",
    },
    {
      id: "#ISS-004",
      title: "Noise complaint from construction site",
      priority: "Low",
      status: "Closed",
      assignee: "Sarah Davis",
      reported: "2024-01-12",
      reporter: "Local Business",
    },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div>
            <div className="content-header">
              <UserIcon />
              <div>
                <h1 className="content-title">Profile Management</h1>
                {/* <p className="content-description">Manage your account settings and preferences</p> */}
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="card">
                <div className="card-header">
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div className="user-avatar">JD</div>
                    <div>
                      <h3 className="card-title">Ankit Sharma</h3>
                      <p className="card-description">Administrator</p>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Email</span>
                      <span style={{ fontSize: "14px" }}>ankitsharma123@gmail.com</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Role</span>
                      <span className="badge badge-secondary">Admin</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Last Login</span>
                      <span style={{ fontSize: "14px" }}>2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Account Settings</h3>
                  <p className="card-description">Update your preferences</p>
                </div>
                <div className="card-content" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <button className="btn btn-outline">Edit Profile</button>
                  <button className="btn btn-outline">Change Password</button>
                  <button className="btn btn-outline">Settings</button>
                </div>
              </div>
            </div>
          </div>
        )

      case "recent-posts":
        return (
          <div>
            <div className="content-header">
              <FileTextIcon />
              <div>
                <h1 className="content-title">Recent Posts</h1>
                {/* <p className="content-description">Recent posts submitted by users</p> */}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  user: "Sarah Johnson",
                  title: "Pothole on Main Street needs urgent repair",
                  date: "2 hours ago",
                  status: "Pending Review",
                  location: "Main St & 5th Ave",
                },
                {
                  user: "Mike Chen",
                  title: "Broken streetlight causing safety concerns",
                  date: "5 hours ago",
                  status: "Under Investigation",
                  location: "Oak Park Boulevard",
                },
                {
                  user: "Emily Rodriguez",
                  title: "Graffiti removal request for community center",
                  date: "1 day ago",
                  status: "Assigned",
                  location: "Community Center Wall",
                },
              ].map((post, index) => (
                <div key={index} className="post-item">
                  <div className="post-header">
                    <div className="post-user">
                      <div className="user-avatar">
                        {post.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", fontSize: "14px" }}>{post.user}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>{post.location}</div>
                      </div>
                    </div>
                    <div className="post-meta">
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <CalendarIcon />
                        {post.date}
                      </div>
                      <span
                        className={`badge ${post.status === "Pending Review" ? "badge-secondary" : post.status === "Under Investigation" ? "badge-medium" : "badge-default"}`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                  <div className="post-content">
                    <h3 style={{ fontWeight: "500", marginBottom: "8px" }}>{post.title}</h3>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn btn-outline btn-sm">
                      <EditIcon />
                      Review
                    </button>
                    <button className="btn btn-primary btn-sm">Assign</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "manage-issues":
        return (
          <div>
            <div className="content-header">
              <AlertCircleIcon />
              <div>
                <h1 className="content-title">Manage Issues</h1>
                {/* <p className="content-description">
                  Comprehensive interface for tracking and handling issues efficiently
                </p> */}
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                <button className="btn btn-outline">
                  <FilterIcon />
                  Filter
                </button>
                <button className="btn btn-outline">
                  <SearchIcon />
                  Search
                </button>
              </div>
            </div>

            <div className="card">
              {/* <div className="card-header">
                <h3 className="card-title">Issue Overview</h3>
                 <p className="card-description">All issues with key details and status tracking</p> 
              </div> */}
              <div className="card-content">
                <div className="issue-list">
                  {arr.map((issue, index) => (
                    <div key={index} className="issue-item">
                      <div className="issue-details">
                        <div className="issue-header">
                          <span className="issue-id">{issue.id}</span>
                          <span
                            className={`badge ${issue.priority === "High" ? "badge-high" : issue.priority === "Medium" ? "badge-medium" : "badge-low"}`}
                          >
                            {issue.priority}
                          </span>
                          <span className="badge badge-outline">{issue.status}</span>
                        </div>
                        <div className="issue-title">{issue.title}</div>
                        <div
                          style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#6b7280", marginTop: "8px" }}
                        >
                          <span>Assigned: {issue.assignee}</span>
                          <span>Reported: {issue.reported}</span>
                          <span>Reporter: {issue.reporter}</span>
                        </div>
                      </div>
                      <div className="issue-actions">
                        <button className="btn btn-outline btn-sm">View Details</button>
                        {/* <button className="btn btn-outline btn-sm">
                          <EditIcon />
                          Edit
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case "stats":
        return (
          <div>
            <div className="content-header">
              <BarChart3Icon />
              <div>
                <h1 className="content-title">Statistics</h1>
                {/* <p className="content-description">Case statistics and metrics</p> */}
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div className="card">
                <div className="card-content">
                  <div className="stat-card">
                    <div className="stat-icon-wrapper pending">
                      <AlertTriangleIcon />
                    </div>
                    <div>
                      <div className="stat-number">23</div>
                      <div className="stat-label">Pending Cases</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <div className="stat-card">
                    <div className="stat-icon-wrapper resolved">
                      <CheckCircleIcon />
                    </div>
                    <div>
                      <div className="stat-number">156</div>
                      <div className="stat-label">Resolved Cases</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <div className="stat-card">
                    <div className="stat-icon-wrapper total">
                      <HashIcon />
                    </div>
                    <div>
                      <div className="stat-number">179</div>
                      <div className="stat-label">Total Cases</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "dashboard":
        return (
          <div>
            <div className="content-header">
              <LayoutDashboardIcon />
              <div>
                <h1 className="content-title">Dashboard Overview</h1>
              </div>
            </div>

            <div className="card">
              <div className="card-content" style={{ textAlign: "center", padding: "48px" }}>
                <p style={{ color: "#6b7280", fontSize: "16px" }}>
                  This section will integrate with the main dashboard created by your teammate.
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "400px" }}>
            <p style={{ color: "#6b7280" }}>Select a section from the sidebar</p>
          </div>
        )
    }
  }

  return <div className="main-content">{renderContent()}</div>
}