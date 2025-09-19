import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/HomePage";
import Dashboard from "./pages/DashBoardPage";
import Issues from "./pages/IssuesPage";
import SettingsPage from "./pages/Settings";
import Users from "./pages/UserPage";

import NotFound from "./pages/Notfound";

// Dummy Toaster and Tooltip components using Tailwind
const Toaster = () => (
  <div className="fixed top-4 right-4 space-y-2 z-50">
    {/* Add dynamic toasts here if needed */}
  </div>
);

const TooltipProvider = ({ children }) => <>{children}</>;

// Initialize React Query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
