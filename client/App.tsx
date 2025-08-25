import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TenantManagement from "./pages/TenantManagement";
import TenantRegistration from "./pages/TenantRegistration";
import RoomManagement from "./pages/RoomManagement";
import FacilitiesManagement from "./pages/FacilitiesManagement";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import Settings from "./pages/Settings";
import MainLayout from "./components/layout/MainLayout";
import PlaceholderPage from "./components/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes with Layout */}
          <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route
            path="/tenants"
            element={
              <MainLayout>
                <TenantManagement />
              </MainLayout>
            }
          />
          <Route
            path="/tenants/new"
            element={
              <MainLayout>
                <TenantRegistration />
              </MainLayout>
            }
          />
          <Route
            path="/rooms"
            element={
              <MainLayout>
                <RoomManagement />
              </MainLayout>
            }
          />
          <Route
            path="/facilities"
            element={
              <MainLayout>
                <FacilitiesManagement />
              </MainLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <MainLayout>
                <ReportsAnalytics />
              </MainLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <MainLayout>
                <PlaceholderPage
                  title="Settings"
                  description="System configuration and administrative settings"
                />
              </MainLayout>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
