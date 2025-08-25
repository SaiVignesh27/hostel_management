import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircle,
  Plus,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Wrench,
  Bug,
  Lightbulb,
  Shield,
  Search,
  Filter,
  Eye,
} from "lucide-react";

// Validation schema for new request
const requestSchema = z.object({
  type: z.enum(["maintenance", "complaint", "suggestion"], {
    required_error: "Please select a request type",
  }),
  category: z.string().min(1, "Please select a category"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select priority level",
  }),
  location: z.string().optional(),
});

type RequestForm = z.infer<typeof requestSchema>;

// Mock data for requests
const mockRequests = [
  {
    id: 1,
    type: "maintenance",
    category: "electrical",
    title: "AC not cooling properly",
    description:
      "The air conditioner in my room (A-101) is not cooling effectively. It's been running but the temperature remains high even after several hours.",
    priority: "high",
    status: "in_progress",
    location: "Room A-101",
    submittedDate: "2024-03-12T10:30:00Z",
    updatedDate: "2024-03-13T14:20:00Z",
    assignedTo: "Maintenance Team",
    estimatedCompletion: "2024-03-15",
    updates: [
      {
        date: "2024-03-13T14:20:00Z",
        message: "Technician assigned. AC filter replacement scheduled.",
        by: "Maintenance Team",
      },
      {
        date: "2024-03-12T11:00:00Z",
        message: "Request received and under review.",
        by: "System",
      },
    ],
  },
  {
    id: 2,
    type: "complaint",
    category: "noise",
    title: "Loud music from neighboring room",
    description:
      "Room B-202 plays loud music during late hours (after 10 PM) which disturbs sleep. This has been happening for the past week.",
    priority: "medium",
    status: "resolved",
    location: "Room A-101 (complaint about B-202)",
    submittedDate: "2024-03-08T22:45:00Z",
    updatedDate: "2024-03-10T16:30:00Z",
    assignedTo: "Management",
    resolution:
      "Spoke with tenant in B-202. Issue resolved with mutual agreement on quiet hours.",
    updates: [
      {
        date: "2024-03-10T16:30:00Z",
        message: "Issue resolved. Quiet hours policy reinforced.",
        by: "Management",
      },
      {
        date: "2024-03-09T09:15:00Z",
        message: "Management will speak with the concerned tenant.",
        by: "Management",
      },
    ],
  },
  {
    id: 3,
    type: "maintenance",
    category: "plumbing",
    title: "Water pressure issue in bathroom",
    description:
      "Low water pressure in the shower. Takes very long to fill bucket for bath.",
    priority: "medium",
    status: "pending",
    location: "Room A-101 Bathroom",
    submittedDate: "2024-03-14T08:15:00Z",
    assignedTo: "Pending Assignment",
    updates: [
      {
        date: "2024-03-14T08:15:00Z",
        message: "Request submitted successfully.",
        by: "System",
      },
    ],
  },
  {
    id: 4,
    type: "suggestion",
    category: "facility",
    title: "Study room extension hours",
    description:
      "Would like to request extension of study room hours till 2 AM during exam periods.",
    priority: "low",
    status: "under_review",
    location: "Study Room",
    submittedDate: "2024-03-11T19:30:00Z",
    updatedDate: "2024-03-12T10:45:00Z",
    assignedTo: "Management",
    updates: [
      {
        date: "2024-03-12T10:45:00Z",
        message:
          "Suggestion is under management review. Decision expected by end of week.",
        by: "Management",
      },
    ],
  },
];

const categories = {
  maintenance: [
    { value: "electrical", label: "Electrical (AC, Lights, Fans)" },
    { value: "plumbing", label: "Plumbing (Water, Drainage)" },
    { value: "furniture", label: "Furniture & Fixtures" },
    { value: "internet", label: "Internet & WiFi" },
    { value: "safety", label: "Safety & Security" },
    { value: "cleaning", label: "Cleaning & Hygiene" },
    { value: "other", label: "Other" },
  ],
  complaint: [
    { value: "noise", label: "Noise Disturbance" },
    { value: "hygiene", label: "Hygiene Issues" },
    { value: "behavior", label: "Tenant Behavior" },
    { value: "service", label: "Service Quality" },
    { value: "billing", label: "Billing Issues" },
    { value: "safety", label: "Safety Concerns" },
    { value: "other", label: "Other" },
  ],
  suggestion: [
    { value: "facility", label: "Facility Improvement" },
    { value: "service", label: "Service Enhancement" },
    { value: "policy", label: "Policy Suggestion" },
    { value: "amenity", label: "New Amenity" },
    { value: "other", label: "Other" },
  ],
};

export default function TenantRequests() {
  const [requests, setRequests] = useState(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const form = useForm<RequestForm>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      type: "maintenance",
      priority: "medium",
    },
  });

  const requestType = form.watch("type");

  const filteredRequests = requests.filter((request) => {
    const matchesTab = activeTab === "all" || request.type === activeTab;
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesTab && matchesSearch && matchesStatus;
  });

  const onSubmit = async (data: RequestForm) => {
    const newRequest = {
      id: requests.length + 1,
      ...data,
      status: "pending",
      location: data.location || "Room A-101",
      submittedDate: new Date().toISOString(),
      assignedTo: "Pending Assignment",
      updates: [
        {
          date: new Date().toISOString(),
          message: "Request submitted successfully.",
          by: "System",
        },
      ],
    };

    setRequests([newRequest, ...requests]);
    form.reset();
    setDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
      case "completed":
        return "bg-success text-success-foreground";
      case "in_progress":
        return "bg-info text-info-foreground";
      case "under_review":
        return "bg-warning text-warning-foreground";
      case "pending":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "maintenance":
        return <Wrench className="h-4 w-4" />;
      case "complaint":
        return <Bug className="h-4 w-4" />;
      case "suggestion":
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in_progress":
        return <Clock className="h-4 w-4" />;
      case "pending":
      case "under_review":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <XCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Service Requests
          </h1>
          <p className="text-muted-foreground">
            Submit and track your maintenance requests, complaints, and
            suggestions
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit New Request</DialogTitle>
              <DialogDescription>
                Fill out the form below to submit your request
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Request Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="maintenance">
                              Maintenance
                            </SelectItem>
                            <SelectItem value="complaint">Complaint</SelectItem>
                            <SelectItem value="suggestion">
                              Suggestion
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(categories[requestType] || []).map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Brief description of the issue"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide detailed information about your request..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Specific location (e.g., Room A-101)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit Request</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {requests.filter((r) => r.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <AlertCircle className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {requests.filter((r) => r.status === "in_progress").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {requests.filter((r) => r.status === "resolved").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Requests</CardTitle>
              <CardDescription>
                Track the status of your submitted requests
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="complaint">Complaints</TabsTrigger>
              <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(request.type)}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{request.title}</h3>
                            <Badge variant="outline">{request.type}</Badge>
                            <Badge
                              className={getPriorityColor(request.priority)}
                            >
                              {request.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {request.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {new Date(
                                  request.submittedDate,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Shield className="h-3 w-3" />
                              <span>{request.assignedTo}</span>
                            </div>
                            {request.location && (
                              <div className="flex items-center space-x-1">
                                <span>📍 {request.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1">
                            {request.status.replace("_", " ")}
                          </span>
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request);
                            setViewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredRequests.length === 0 && (
                  <div className="text-center py-8">
                    <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-semibold">
                      No requests found
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      No requests match your current filters.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Request Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>
              Full information about your request
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Request Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>ID:</strong> #{selectedRequest.id}
                    </div>
                    <div>
                      <strong>Type:</strong> {selectedRequest.type}
                    </div>
                    <div>
                      <strong>Category:</strong> {selectedRequest.category}
                    </div>
                    <div>
                      <strong>Title:</strong> {selectedRequest.title}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Status & Priority</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <strong>Status:</strong>
                      <Badge className={getStatusColor(selectedRequest.status)}>
                        {selectedRequest.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <strong>Priority:</strong>
                      <Badge
                        className={getPriorityColor(selectedRequest.priority)}
                      >
                        {selectedRequest.priority}
                      </Badge>
                    </div>
                    <div>
                      <strong>Assigned to:</strong> {selectedRequest.assignedTo}
                    </div>
                    {selectedRequest.estimatedCompletion && (
                      <div>
                        <strong>Est. Completion:</strong>{" "}
                        {new Date(
                          selectedRequest.estimatedCompletion,
                        ).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                  {selectedRequest.description}
                </p>
              </div>

              {selectedRequest.resolution && (
                <div>
                  <h4 className="font-medium mb-2">Resolution</h4>
                  <p className="text-sm text-muted-foreground bg-success/10 p-3 rounded-lg border border-success/20">
                    {selectedRequest.resolution}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Updates Timeline</h4>
                <div className="space-y-3">
                  {selectedRequest.updates.map((update, index) => (
                    <div
                      key={index}
                      className="flex space-x-3 p-3 border rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{update.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(update.date).toLocaleString()} • by{" "}
                          {update.by}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
