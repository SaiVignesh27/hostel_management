import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User,
  Home,
  DollarSign,
  Calendar,
  Clock,
  Bell,
  UtensilsCrossed,
  Shirt,
  Wrench,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Wifi,
  Zap,
  Droplets,
  Plus,
  Edit,
  Download,
} from "lucide-react";

// Mock tenant data
const tenantData = {
  personal: {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 9876543210",
    age: 24,
    profileImage: "",
    emergencyContact: "+91 9876543211",
    occupation: "Software Engineer",
    joiningDate: "2024-01-15",
    status: "active",
  },
  room: {
    number: "A-101",
    type: "Single",
    floor: 1,
    rent: 8500,
    deposit: 17000,
    facilities: ["AC", "WiFi", "Attached Bathroom"],
    checkInDate: "2024-01-15",
  },
  payments: {
    current: {
      month: "March 2024",
      rent: 8500,
      meals: 2400,
      laundry: 200,
      utilities: 450,
      total: 11550,
      dueDate: "2024-03-31",
      status: "pending",
    },
    history: [
      {
        month: "February 2024",
        amount: 11200,
        paidDate: "2024-02-28",
        status: "paid",
      },
      {
        month: "January 2024",
        amount: 10800,
        paidDate: "2024-01-30",
        status: "paid",
      },
    ],
  },
  meals: {
    preference: "veg",
    plan: ["breakfast", "dinner"],
    todayMenu: {
      breakfast: "Idli, Sambar, Chutney",
      lunch: "Rice, Dal, Sabzi, Roti",
      dinner: "Chapati, Paneer Curry, Rice",
    },
    weeklyCount: {
      breakfast: 6,
      lunch: 3,
      dinner: 7,
    },
  },
  laundry: {
    currentOrders: [
      {
        id: 1,
        type: "Regular",
        items: 8,
        pickupDate: "2024-03-14",
        status: "in_progress",
      },
    ],
    history: [
      {
        id: 2,
        type: "Express",
        items: 5,
        pickupDate: "2024-03-10",
        status: "completed",
        cost: 250,
      },
    ],
  },
  requests: [
    {
      id: 1,
      type: "maintenance",
      title: "AC not cooling properly",
      description: "The AC in my room is not cooling effectively",
      status: "in_progress",
      date: "2024-03-12",
      priority: "medium",
    },
    {
      id: 2,
      type: "complaint",
      title: "Noise from neighboring room",
      description: "Loud music during late hours",
      status: "resolved",
      date: "2024-03-08",
      priority: "low",
    },
  ],
  notifications: [
    {
      id: 1,
      title: "Payment Reminder",
      message: "March rent payment due in 3 days",
      type: "payment",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Laundry Ready",
      message: "Your laundry order #123 is ready for pickup",
      type: "laundry",
      time: "1 day ago",
      read: true,
    },
  ],
};

export default function TenantDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { personal, room, payments, meals, laundry, requests, notifications } = tenantData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
      case "resolved":
        return "bg-success text-success-foreground";
      case "pending":
      case "in_progress":
        return "bg-warning text-warning-foreground";
      case "overdue":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={personal.profileImage} />
              <AvatarFallback>{getInitials(personal.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">Welcome back, {personal.name}</h1>
              <p className="text-sm text-muted-foreground">Room {room.number} • {room.type}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
              {notifications.filter(n => !n.read).length > 0 && (
                <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
                  {notifications.filter(n => !n.read).length}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Bill</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{payments.current.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Due: {new Date(payments.current.dueDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stay Duration</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.floor((new Date().getTime() - new Date(personal.joiningDate).getTime()) / (1000 * 60 * 60 * 24))} days
              </div>
              <p className="text-xs text-muted-foreground">
                Since {new Date(personal.joiningDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meals This Week</CardTitle>
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {meals.weeklyCount.breakfast + meals.weeklyCount.lunch + meals.weeklyCount.dinner}
              </div>
              <p className="text-xs text-muted-foreground">
                {meals.preference === "veg" ? "Vegetarian" : "Non-Vegetarian"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests.filter(r => r.status !== "resolved").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Pending resolution
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="gap-2">
              <Home className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="requests" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Requests
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Payment Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Month Bill</CardTitle>
                  <CardDescription>{payments.current.month}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Room Rent</span>
                      <span>₹{payments.current.rent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meals</span>
                      <span>₹{payments.current.meals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Laundry</span>
                      <span>₹{payments.current.laundry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Utilities</span>
                      <span>₹{payments.current.utilities}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>₹{payments.current.total}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(payments.current.status)}>
                      {payments.current.status.toUpperCase()}
                    </Badge>
                    <Button className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Pay Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Today's Menu */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Menu</CardTitle>
                  <CardDescription>
                    Your meal plan: {meals.plan.join(", ")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Breakfast</div>
                        <div className="text-sm text-muted-foreground">
                          {meals.todayMenu.breakfast}
                        </div>
                      </div>
                      {meals.plan.includes("breakfast") ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <div className="text-sm text-muted-foreground">Not subscribed</div>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Lunch</div>
                        <div className="text-sm text-muted-foreground">
                          {meals.todayMenu.lunch}
                        </div>
                      </div>
                      {meals.plan.includes("lunch") ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <div className="text-sm text-muted-foreground">Not subscribed</div>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Dinner</div>
                        <div className="text-sm text-muted-foreground">
                          {meals.todayMenu.dinner}
                        </div>
                      </div>
                      {meals.plan.includes("dinner") ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <div className="text-sm text-muted-foreground">Not subscribed</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>
                    Latest updates and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start space-x-3 p-3 rounded-lg border ${
                          !notification.read ? "bg-accent/50" : ""
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {notification.type === "payment" && (
                            <DollarSign className="h-5 w-5 text-warning" />
                          )}
                          {notification.type === "laundry" && (
                            <Shirt className="h-5 w-5 text-info" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="font-medium text-sm">{notification.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {notification.message}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {notification.time}
                          </div>
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
                    Frequently used services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                      <Wrench className="h-6 w-6" />
                      <span className="text-sm">Maintenance Request</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                      <Shirt className="h-6 w-6" />
                      <span className="text-sm">Laundry Service</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                      <MessageCircle className="h-6 w-6" />
                      <span className="text-sm">File Complaint</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                      <UtensilsCrossed className="h-6 w-6" />
                      <span className="text-sm">Meal Preferences</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Bill</CardTitle>
                  <CardDescription>{payments.current.month}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Room Rent</span>
                      <span>₹{payments.current.rent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meals</span>
                      <span>₹{payments.current.meals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Laundry</span>
                      <span>₹{payments.current.laundry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Utilities</span>
                      <span>₹{payments.current.utilities}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>₹{payments.current.total}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full gap-2">
                      <CreditCard className="h-4 w-4" />
                      Pay Online
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Download className="h-4 w-4" />
                      Download Bill
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Previous payment records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {payments.history.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{payment.month}</div>
                          <div className="text-sm text-muted-foreground">
                            Paid on {new Date(payment.paidDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{payment.amount}</div>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Meal Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Meal Services</CardTitle>
                  <CardDescription>Your current meal plan and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Dietary Preference</span>
                    <Badge variant="outline">
                      {meals.preference === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Subscribed Meals</span>
                    <div className="flex gap-2">
                      {meals.plan.map((meal) => (
                        <Badge key={meal} variant="default">
                          {meal.charAt(0).toUpperCase() + meal.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">This Week's Count</span>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Breakfast</span>
                        <span>{meals.weeklyCount.breakfast}/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lunch</span>
                        <span>{meals.weeklyCount.lunch}/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dinner</span>
                        <span>{meals.weeklyCount.dinner}/7</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Modify Meal Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Laundry Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Laundry Services</CardTitle>
                  <CardDescription>Track your laundry orders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {laundry.currentOrders.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Current Orders</span>
                      {laundry.currentOrders.map((order) => (
                        <div key={order.id} className="mt-2 p-3 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{order.type} Wash</div>
                              <div className="text-sm text-muted-foreground">
                                {order.items} items • Picked up {new Date(order.pickupDate).toLocaleDateString()}
                              </div>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    New Laundry Request
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Service Requests</CardTitle>
                    <CardDescription>Track your maintenance and complaint requests</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Request
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{request.title}</div>
                            <Badge variant="outline">{request.type}</Badge>
                            <Badge variant="outline">{request.priority} priority</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {request.description}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Submitted on {new Date(request.date).toLocaleDateString()}
                          </div>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={personal.profileImage} />
                      <AvatarFallback className="text-lg">
                        {getInitials(personal.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-lg">{personal.name}</div>
                      <div className="text-sm text-muted-foreground">{personal.occupation}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{personal.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{personal.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Age: {personal.age}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>Emergency: {personal.emergencyContact}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Room Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Room Information</CardTitle>
                  <CardDescription>Details about your accommodation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span>Room {room.number}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{room.type} • Floor {room.floor}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>₹{room.rent}/month</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Check-in: {new Date(room.checkInDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Facilities</span>
                    <div className="flex flex-wrap gap-2">
                      {room.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
