import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  UtensilsCrossed,
  Shirt,
  Wifi,
  Zap,
  Droplets,
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Settings,
  Save,
  Plus,
  Edit,
  AlertTriangle,
  CheckCircle,
  Users,
  Activity,
} from "lucide-react";

// Mock data for facilities
const facilitiesData = {
  meals: {
    statistics: {
      totalMealsToday: 245,
      vegMeals: 145,
      nonVegMeals: 100,
      breakfastCount: 89,
      lunchCount: 78,
      dinnerCount: 78,
    },
    schedule: {
      breakfast: { start: "07:00", end: "09:30", price: 50 },
      lunch: { start: "12:00", end: "14:30", price: 80 },
      dinner: { start: "19:00", end: "21:30", price: 80 },
    },
    preferences: [
      { id: 1, tenant: "John Doe", room: "A-101", preference: "veg", meals: ["breakfast", "dinner"] },
      { id: 2, tenant: "Sarah Smith", room: "B-205", preference: "non-veg", meals: ["lunch", "dinner"] },
      { id: 3, tenant: "Mike Johnson", room: "A-102", preference: "veg", meals: ["breakfast", "lunch", "dinner"] },
      { id: 4, tenant: "Emily Brown", room: "C-301", preference: "non-veg", meals: ["dinner"] },
    ],
  },
  laundry: {
    statistics: {
      totalOrders: 23,
      pendingPickup: 8,
      inProgress: 7,
      completed: 8,
      revenue: 3450,
    },
    pricing: {
      regular: 25,
      express: 50,
      dryClean: 100,
    },
    schedule: [
      { id: 1, tenant: "John Doe", room: "A-101", type: "regular", status: "pending", pickup: "2024-03-15", items: 12 },
      { id: 2, tenant: "Sarah Smith", room: "B-205", type: "express", status: "in_progress", pickup: "2024-03-14", items: 8 },
      { id: 3, tenant: "Mike Johnson", room: "A-102", type: "regular", status: "completed", pickup: "2024-03-13", items: 15 },
      { id: 4, tenant: "Emily Brown", room: "C-301", type: "dry_clean", status: "completed", pickup: "2024-03-12", items: 3 },
    ],
  },
  utilities: {
    wifi: {
      status: "operational",
      usage: 85,
      bandwidth: "500 Mbps",
      connectedDevices: 127,
      monthlyUsage: "2.3 TB",
      lastIssue: null,
    },
    electricity: {
      status: "operational",
      usage: 72,
      monthlyConsumption: "3,450 kWh",
      cost: 31050,
      lastReading: "2024-03-14",
      peakHours: "18:00 - 22:00",
    },
    water: {
      status: "high_usage",
      usage: 90,
      monthlyConsumption: "45,000 L",
      cost: 4500,
      lastReading: "2024-03-14",
      tankLevel: "75%",
    },
  },
};

export default function FacilitiesManagement() {
  const [activeTab, setActiveTab] = useState("meals");
  const { meals, laundry, utilities } = facilitiesData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-success text-success-foreground";
      case "high_usage":
        return "bg-warning text-warning-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "in_progress":
        return "bg-info text-info-foreground";
      case "completed":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getUtilityIcon = (utility: string) => {
    switch (utility) {
      case "wifi":
        return <Wifi className="h-5 w-5" />;
      case "electricity":
        return <Zap className="h-5 w-5" />;
      case "water":
        return <Droplets className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facilities Management</h1>
          <p className="text-muted-foreground">
            Manage meals, laundry services, and utility tracking
          </p>
        </div>
        <Button className="gap-2">
          <Settings className="h-4 w-4" />
          Configure Services
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meals Today</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meals.statistics.totalMealsToday}</div>
            <p className="text-xs text-muted-foreground">
              {meals.statistics.vegMeals} veg, {meals.statistics.nonVegMeals} non-veg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laundry Orders</CardTitle>
            <Shirt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{laundry.statistics.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {laundry.statistics.pendingPickup} pending pickup
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WiFi Usage</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{utilities.wifi.usage}%</div>
            <p className="text-xs text-muted-foreground">
              {utilities.wifi.connectedDevices} devices connected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utility Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(utilities.electricity.cost + utilities.water.cost).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="meals" className="gap-2">
            <UtensilsCrossed className="h-4 w-4" />
            Meals Management
          </TabsTrigger>
          <TabsTrigger value="laundry" className="gap-2">
            <Shirt className="h-4 w-4" />
            Laundry Services
          </TabsTrigger>
          <TabsTrigger value="utilities" className="gap-2">
            <Zap className="h-4 w-4" />
            Utilities
          </TabsTrigger>
        </TabsList>

        {/* Meals Management */}
        <TabsContent value="meals" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Meal Schedule & Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Meal Schedule & Pricing</CardTitle>
                <CardDescription>Configure meal timings and prices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(meals.schedule).map(([meal, details]) => (
                  <div key={meal} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium capitalize">{meal}</div>
                        <div className="text-sm text-muted-foreground">
                          {details.start} - {details.end}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{details.price}</div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Today's Meal Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Meal Statistics</CardTitle>
                <CardDescription>Current meal distribution and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Breakfast</span>
                    <span className="text-sm font-medium">{meals.statistics.breakfastCount} orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Lunch</span>
                    <span className="text-sm font-medium">{meals.statistics.lunchCount} orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Dinner</span>
                    <span className="text-sm font-medium">{meals.statistics.dinnerCount} orders</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Vegetarian</span>
                      <span className="text-sm font-medium">{meals.statistics.vegMeals}</span>
                    </div>
                    <Progress value={(meals.statistics.vegMeals / meals.statistics.totalMealsToday) * 100} className="h-2" />
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Non-Vegetarian</span>
                      <span className="text-sm font-medium">{meals.statistics.nonVegMeals}</span>
                    </div>
                    <Progress value={(meals.statistics.nonVegMeals / meals.statistics.totalMealsToday) * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tenant Meal Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Tenant Meal Preferences</CardTitle>
              <CardDescription>Manage individual tenant meal subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Preference</TableHead>
                    <TableHead>Subscribed Meals</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {meals.preferences.map((pref) => (
                    <TableRow key={pref.id}>
                      <TableCell className="font-medium">{pref.tenant}</TableCell>
                      <TableCell>{pref.room}</TableCell>
                      <TableCell>
                        <Badge variant={pref.preference === "veg" ? "default" : "secondary"}>
                          {pref.preference === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {pref.meals.map((meal) => (
                            <Badge key={meal} variant="outline" className="text-xs">
                              {meal}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Laundry Services */}
        <TabsContent value="laundry" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Laundry Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Service Pricing</CardTitle>
                <CardDescription>Configure laundry service rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Regular Wash</div>
                      <div className="text-sm text-muted-foreground">2-3 days delivery</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{laundry.pricing.regular}/item</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Express Wash</div>
                      <div className="text-sm text-muted-foreground">24 hours delivery</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{laundry.pricing.express}/item</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Dry Clean</div>
                      <div className="text-sm text-muted-foreground">3-5 days delivery</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{laundry.pricing.dryClean}/item</div>
                    </div>
                  </div>
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Update Pricing
                </Button>
              </CardContent>
            </Card>

            {/* Laundry Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Service Statistics</CardTitle>
                <CardDescription>Current laundry service metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-warning">
                      {laundry.statistics.pendingPickup}
                    </div>
                    <div className="text-sm text-muted-foreground">Pending Pickup</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-info">
                      {laundry.statistics.inProgress}
                    </div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-success">
                      {laundry.statistics.completed}
                    </div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold">
                      ₹{laundry.statistics.revenue}
                    </div>
                    <div className="text-sm text-muted-foreground">Revenue</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Laundry Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Current Orders</CardTitle>
              <CardDescription>Track and manage laundry orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Pickup Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {laundry.schedule.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.tenant}</TableCell>
                      <TableCell>{order.room}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {order.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.items} items</TableCell>
                      <TableCell>{order.pickup}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Utilities */}
        <TabsContent value="utilities" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {Object.entries(utilities).map(([utility, data]) => (
              <Card key={utility}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getUtilityIcon(utility)}
                    {utility.charAt(0).toUpperCase() + utility.slice(1)}
                  </CardTitle>
                  <CardDescription>
                    <Badge className={getStatusColor(data.status)}>
                      {data.status.replace('_', ' ')}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Usage</span>
                      <span>{data.usage}%</span>
                    </div>
                    <Progress value={data.usage} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    {utility === "wifi" && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>Bandwidth</span>
                          <span>{data.bandwidth}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Connected Devices</span>
                          <span>{data.connectedDevices}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Monthly Usage</span>
                          <span>{data.monthlyUsage}</span>
                        </div>
                      </>
                    )}
                    
                    {utility === "electricity" && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>Monthly Consumption</span>
                          <span>{data.monthlyConsumption}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cost</span>
                          <span>₹{data.cost}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Peak Hours</span>
                          <span>{data.peakHours}</span>
                        </div>
                      </>
                    )}
                    
                    {utility === "water" && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>Monthly Consumption</span>
                          <span>{data.monthlyConsumption}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cost</span>
                          <span>₹{data.cost}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tank Level</span>
                          <span>{data.tankLevel}</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Utility Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Utility Alerts & Notifications</CardTitle>
              <CardDescription>Recent issues and maintenance alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg border-warning/20 bg-warning/5">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <div className="flex-1">
                    <div className="font-medium">High Water Usage Alert</div>
                    <div className="text-sm text-muted-foreground">
                      Water consumption is 20% above normal levels. Consider checking for leaks.
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">2 hours ago</div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg border-success/20 bg-success/5">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <div className="flex-1">
                    <div className="font-medium">WiFi Maintenance Completed</div>
                    <div className="text-sm text-muted-foreground">
                      Network optimization completed. Bandwidth increased to 500 Mbps.
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">1 day ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
