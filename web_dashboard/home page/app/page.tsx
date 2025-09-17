"use client"
import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import "@/styles/dashboard.css"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard")

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <DashboardContent activeSection={activeSection} />
      </div>
    </div>
  )
}
