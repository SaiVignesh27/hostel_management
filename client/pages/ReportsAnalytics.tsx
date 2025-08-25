import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Bed,
  DollarSign,
  Calendar,
  Download,
  Filter,
  Eye,
  Zap,
  Droplets,
  Wifi,
  UtensilsCrossed,
  Shirt,
} from "lucide-react";

// Mock data for analytics
const analyticsData = {
  occupancyTrend: [
    { month: "Jan", occupied: 16, vacant: 4, rate: 80 },
    { month: "Feb", occupied: 18, vacant: 2, rate: 90 },
    { month: "Mar", occupied: 17, vacant: 3, rate: 85 },
    { month: "Apr", occupied: 19, vacant: 1, rate: 95 },
    { month: "May", occupied: 18, vacant: 2, rate: 90 },
    { month: "Jun", occupied: 20, vacant: 0, rate: 100 },
  ],
  revenueData: [
    { month: "Jan", rent: 180000, facilities: 45000, laundry: 15000, total: 240000 },
    { month: "Feb", rent: 195000, facilities: 48000, laundry: 18000, total: 261000 },
    { month: "Mar", rent: 185000, facilities: 46000, laundry: 16000, total: 247000 },
    { month: "Apr", rent: 205000, facilities: 52000, laundry: 20000, total: 277000 },
    { month: "May", rent: 198000, facilities: 49000, laundry: 17000, total: 264000 },
    { month: "Jun", rent: 210000, facilities: 55000, laundry: 22000, total: 287000 },
  ],
  utilityUsage: [
    { month: "Jan", electricity: 3200, water: 4100, internet: 850 },
    { month: "Feb", electricity: 3450, water: 4300, internet: 900 },
    { month: "Mar", electricity: 3300, water: 4200, internet: 880 },
    { month: "Apr", electricity: 3600, water: 4500, internet: 920 },
    { month: "May", electricity: 3550, water: 4400, internet: 910 },
    { month: "Jun", electricity: 3700, water: 4600, internet: 950 },
  ],
  roomTypeDistribution: [
    { name: "Single", value: 8, color: "#3b82f6" },
    { name: "Double", value: 7, color: "#10b981" },
    { name: "Triple", value: 5, color: "#8b5cf6" },
  ],
  mealPreferences: [
    { name: "Vegetarian", value: 65, color: "#22c55e" },
    { name: "Non-Vegetarian", value: 35, color: "#ef4444" },
  ],
  facilityUtilization: [
    { facility: "Meals", usage: 89, capacity: 100 },
    { facility: "Laundry", usage: 67, capacity: 100 },
    { facility: "WiFi", usage: 95, capacity: 100 },
    { facility: "Common Area", usage: 78, capacity: 100 },
    { facility: "Study Room", usage: 56, capacity: 100 },
  ],
  weeklyActivity: [
    { day: "Mon", checkIns: 2, checkOuts: 1, maintenance: 3, complaints: 1 },
    { day: "Tue", checkIns: 1, checkOuts: 0, maintenance: 1, complaints: 2 },
    { day: "Wed", checkIns: 3, checkOuts: 2, maintenance: 2, complaints: 0 },
    { day: "Thu", checkIns: 1, checkOuts: 1, maintenance: 1, complaints: 1 },
    { day: "Fri", checkIns: 2, checkOuts: 3, maintenance: 0, complaints: 2 },
    { day: "Sat", checkIns: 4, checkOuts: 1, maintenance: 2, complaints: 1 },
    { day: "Sun", checkIns: 1, checkOuts: 0, maintenance: 1, complaints: 0 },
  ],
};

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

export default function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState("6months");
  const [reportType, setReportType] = useState("all");

  const getCurrentStats = () => {
    const totalRooms = 20;
    const occupiedRooms = 18;
    const totalRevenue = analyticsData.revenueData.reduce((sum, item) => sum + item.total, 0);
    const avgOccupancy = analyticsData.occupancyTrend.reduce((sum, item) => sum + item.rate, 0) / analyticsData.occupancyTrend.length;
    
    return {
      totalRooms,
      occupiedRooms,
      totalRevenue,
      avgOccupancy: Math.round(avgOccupancy),
    };
  };

  const stats = getCurrentStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into hostel performance and utilization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-success" />
              +12% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Occupancy</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgOccupancy}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-success" />
              +5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.occupiedRooms}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-success" />
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facility Usage</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-destructive" />
              -3% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="occupancy" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Occupancy Analytics */}
        <TabsContent value="occupancy" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Trend</CardTitle>
                <CardDescription>Room occupancy rate over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.occupancyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Room Type Distribution</CardTitle>
                <CardDescription>Current room allocation by type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.roomTypeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {analyticsData.roomTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Occupied vs Vacant Rooms</CardTitle>
              <CardDescription>Monthly comparison of room availability</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.occupancyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="occupied" fill="#10b981" name="Occupied" />
                  <Bar dataKey="vacant" fill="#ef4444" name="Vacant" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Analytics */}
        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Monthly revenue from different sources</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={analyticsData.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Legend />
                  <Area type="monotone" dataKey="rent" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Rent" />
                  <Area type="monotone" dataKey="facilities" stackId="1" stroke="#10b981" fill="#10b981" name="Facilities" />
                  <Area type="monotone" dataKey="laundry" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" name="Laundry" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Rent Collection</CardTitle>
                <CardDescription>Monthly rent revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  ₹{analyticsData.revenueData[analyticsData.revenueData.length - 1].rent.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Current month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Facilities Revenue</CardTitle>
                <CardDescription>Meals and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  ₹{analyticsData.revenueData[analyticsData.revenueData.length - 1].facilities.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Current month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Laundry Revenue</CardTitle>
                <CardDescription>Laundry services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  ₹{analyticsData.revenueData[analyticsData.revenueData.length - 1].laundry.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Current month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Utilities Analytics */}
        <TabsContent value="utilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Utility Consumption Trends</CardTitle>
              <CardDescription>Monthly utility usage patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={analyticsData.utilityUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="electricity" stroke="#f59e0b" strokeWidth={2} name="Electricity (kWh)" />
                  <Line type="monotone" dataKey="water" stroke="#3b82f6" strokeWidth={2} name="Water (L)" />
                  <Line type="monotone" dataKey="internet" stroke="#10b981" strokeWidth={2} name="Internet (GB)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Electricity</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,700 kWh</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Water</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,600 L</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Internet</CardTitle>
                <Wifi className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">950 GB</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Facilities Analytics */}
        <TabsContent value="facilities" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Facility Utilization</CardTitle>
                <CardDescription>Current usage vs capacity</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.facilityUtilization} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="facility" type="category" width={80} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="usage" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Meal Preferences</CardTitle>
                <CardDescription>Tenant dietary preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.mealPreferences}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {analyticsData.mealPreferences.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Meals Served Today</CardTitle>
                <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">145 veg, 100 non-veg</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Laundry Orders</CardTitle>
                <Shirt className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">8 pending pickup</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Analytics */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity Overview</CardTitle>
              <CardDescription>Check-ins, check-outs, and maintenance activities</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="checkIns" fill="#10b981" name="Check-ins" />
                  <Bar dataKey="checkOuts" fill="#ef4444" name="Check-outs" />
                  <Bar dataKey="maintenance" fill="#f59e0b" name="Maintenance" />
                  <Bar dataKey="complaints" fill="#8b5cf6" name="Complaints" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Check-ins</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.weeklyActivity.reduce((sum, day) => sum + day.checkIns, 0)}
                </div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Check-outs</CardTitle>
                <TrendingDown className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.weeklyActivity.reduce((sum, day) => sum + day.checkOuts, 0)}
                </div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.weeklyActivity.reduce((sum, day) => sum + day.maintenance, 0)}
                </div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Complaints</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData.weeklyActivity.reduce((sum, day) => sum + day.complaints, 0)}
                </div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
