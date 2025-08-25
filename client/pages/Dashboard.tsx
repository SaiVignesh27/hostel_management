import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Bed,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  ArrowRight,
  Wifi,
  Zap,
  Droplets,
  UtensilsCrossed,
} from "lucide-react";

// Mock data for dashboard
const dashboardData = {
  stats: {
    totalTenants: 45,
    totalRooms: 20,
    occupiedRooms: 18,
    monthlyRevenue: 89500,
    occupancyRate: 90,
    pendingPayments: 3,
  },
  recentActivities: [
    {
      id: 1,
      type: "tenant_check_in",
      message: "John Doe checked into Room 12",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      type: "payment_pending",
      message: "Payment pending for Room 8",
      time: "4 hours ago",
      status: "warning",
    },
    {
      id: 3,
      type: "maintenance_request",
      message: "AC repair requested in Room 15",
      time: "6 hours ago",
      status: "info",
    },
    {
      id: 4,
      type: "tenant_check_out",
      message: "Sarah Smith checked out from Room 7",
      time: "1 day ago",
      status: "info",
    },
  ],
  quickActions: [
    {
      title: "Add New Tenant",
      description: "Register a new tenant",
      icon: Users,
      href: "/tenants/new",
      color: "bg-blue-500",
    },
    {
      title: "Room Assignment",
      description: "Assign rooms to tenants",
      icon: Bed,
      href: "/rooms",
      color: "bg-green-500",
    },
    {
      title: "Generate Report",
      description: "Monthly analytics report",
      icon: TrendingUp,
      href: "/reports",
      color: "bg-purple-500",
    },
    {
      title: "Facility Management",
      description: "Manage hostel facilities",
      icon: UtensilsCrossed,
      href: "/facilities",
      color: "bg-orange-500",
    },
  ],
  utilities: {
    wifi: { usage: 85, status: "good" },
    electricity: { usage: 72, status: "moderate" },
    water: { usage: 90, status: "high" },
  },
};

export default function Dashboard() {
  const { stats, recentActivities, quickActions, utilities } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening in your hostel today.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Quick Action
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTenants}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Room Occupancy</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.occupiedRooms}/{stats.totalRooms}
            </div>
            <div className="flex items-center space-x-2">
              <Progress value={stats.occupancyRate} className="flex-1" />
              <span className="text-sm text-muted-foreground">
                {stats.occupancyRate}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest updates and activities in your hostel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 rounded-lg border p-3"
                >
                  <div className="flex-shrink-0">
                    {activity.status === "success" && (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                    {activity.status === "warning" && (
                      <AlertCircle className="h-5 w-5 text-warning" />
                    )}
                    {activity.status === "info" && (
                      <Clock className="h-5 w-5 text-info" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto p-3"
                >
                  <div className={`rounded-md p-2 ${action.color}`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Utilities Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Utilities Overview</CardTitle>
          <CardDescription>
            Current utility usage and status across the hostel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Wifi className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">WiFi</h3>
                  <Badge 
                    variant={utilities.wifi.status === "good" ? "default" : "secondary"}
                  >
                    {utilities.wifi.status}
                  </Badge>
                </div>
                <div className="mt-2">
                  <Progress value={utilities.wifi.usage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {utilities.wifi.usage}% usage
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <div className="rounded-full bg-yellow-100 p-3">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Electricity</h3>
                  <Badge 
                    variant={utilities.electricity.status === "moderate" ? "secondary" : "default"}
                  >
                    {utilities.electricity.status}
                  </Badge>
                </div>
                <div className="mt-2">
                  <Progress value={utilities.electricity.usage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {utilities.electricity.usage}% usage
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Droplets className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Water</h3>
                  <Badge 
                    variant={utilities.water.status === "high" ? "destructive" : "default"}
                  >
                    {utilities.water.status}
                  </Badge>
                </div>
                <div className="mt-2">
                  <Progress value={utilities.water.usage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {utilities.water.usage}% usage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
