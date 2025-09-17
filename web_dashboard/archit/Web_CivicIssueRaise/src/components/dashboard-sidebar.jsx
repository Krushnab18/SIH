"use client"
import { UserIcon, FileTextIcon, AlertCircleIcon, BarChart3Icon, LayoutDashboardIcon, ChevronRightIcon } from "./icons"

/*interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}*/

const sidebarItems = [
  {
    id: "profile",
    label: "Profile",
    icon: UserIcon,
    description: "Manage your account",
  },
  {
    id: "recent-posts",
    label: "Recent Posts",
    icon: FileTextIcon,
    description: "View user submissions",
  },
  {
    id: "manage-issues",
    label: "Manage Issues",
    icon: AlertCircleIcon,
    description: "Track and resolve issues",
  },
  {
    id: "stats",
    label: "Stats",
    icon: BarChart3Icon,
    description: "Case statistics",
  },
  {
    id: "dashboard",
    label: "Go to Dashboard",
    icon: LayoutDashboardIcon,
    description: "Main dashboard view",
  },
]

export function DashboardSidebar({ activeSection, onSectionChange }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="company-logo">CF</div>
        <h2 className="sidebar-title">CityFix</h2>
      </div>

      <nav className="sidebar-nav">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon />
              <div className="nav-content">
                <div className="nav-label">{item.label}</div>
                <div className="nav-description">{item.description}</div>
              </div>
              <ChevronRightIcon />
            </button>
          )
        })}
      </nav>
    </div>
  )
}
