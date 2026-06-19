import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import "@/layouts/dashboard.css";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="db-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="db-main">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main style={{ padding: "28px 24px", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
