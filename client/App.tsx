import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
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
                <PlaceholderPage
                  title="Tenant Management"
                  description="Manage tenant registration, details, and room assignments"
                />
              </MainLayout>
            }
          />
          <Route
            path="/tenants/new"
            element={
              <MainLayout>
                <PlaceholderPage
                  title="Add New Tenant"
                  description="Register a new tenant with personal details and document uploads"
                />
              </MainLayout>
            }
          />
          <Route
            path="/rooms"
            element={
              <MainLayout>
                <PlaceholderPage
                  title="Room Management"
                  description="CRUD operations for rooms, availability tracking, and room assignments"
                />
              </MainLayout>
            }
          />
          <Route
            path="/facilities"
            element={
              <MainLayout>
                <PlaceholderPage
                  title="Facilities Management"
                  description="Manage meals, laundry services, and utility tracking"
                />
              </MainLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <MainLayout>
                <PlaceholderPage
                  title="Reports & Analytics"
                  description="View room availability reports, utility usage charts, and analytics"
                />
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
