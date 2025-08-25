import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bed,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Users,
  Home,
  DollarSign,
  Grid3X3,
  CheckCircle,
  XCircle,
  Clock,
  User,
  UserCheck,
  Settings,
} from "lucide-react";

// Mock data for rooms
const mockRooms = [
  {
    id: 1,
    roomNumber: "A-101",
    floor: 1,
    type: "single",
    capacity: 1,
    occupied: 1,
    status: "occupied",
    rent: 8500,
    facilities: ["AC", "WiFi", "Attached Bathroom"],
    tenant: "John Doe",
    joinDate: "2024-01-15",
    description: "Single occupancy room with AC and attached bathroom",
  },
  {
    id: 2,
    roomNumber: "A-102",
    floor: 1,
    type: "double",
    capacity: 2,
    occupied: 1,
    status: "partially_occupied",
    rent: 6000,
    facilities: ["WiFi", "Shared Bathroom"],
    tenant: "Mike Johnson",
    joinDate: "2024-01-20",
    description: "Double sharing room with one bed available",
  },
  {
    id: 3,
    roomNumber: "B-201",
    floor: 2,
    type: "triple",
    capacity: 3,
    occupied: 3,
    status: "occupied",
    rent: 5000,
    facilities: ["WiFi", "Shared Bathroom", "Study Table"],
    tenant: "David Wilson, Alex Brown, Chris Lee",
    joinDate: "2024-02-15",
    description: "Triple sharing room fully occupied",
  },
  {
    id: 4,
    roomNumber: "B-202",
    floor: 2,
    type: "double",
    capacity: 2,
    occupied: 0,
    status: "vacant",
    rent: 6000,
    facilities: ["WiFi", "Shared Bathroom"],
    tenant: null,
    joinDate: null,
    description: "Double sharing room available for immediate occupancy",
  },
  {
    id: 5,
    roomNumber: "B-205",
    floor: 2,
    type: "single",
    capacity: 1,
    occupied: 1,
    status: "occupied",
    rent: 9000,
    facilities: ["AC", "WiFi", "Attached Bathroom", "Balcony"],
    tenant: "Sarah Smith",
    joinDate: "2024-02-01",
    description: "Premium single room with balcony and AC",
  },
  {
    id: 6,
    roomNumber: "C-301",
    floor: 3,
    type: "single",
    capacity: 1,
    occupied: 1,
    status: "occupied",
    rent: 10000,
    facilities: ["AC", "WiFi", "Attached Bathroom", "Balcony", "Premium"],
    tenant: "Emily Brown",
    joinDate: "2024-03-01",
    description: "Premium single room with city view",
  },
  {
    id: 7,
    roomNumber: "C-302",
    floor: 3,
    type: "double",
    capacity: 2,
    occupied: 0,
    status: "maintenance",
    rent: 7000,
    facilities: ["AC", "WiFi", "Attached Bathroom"],
    tenant: null,
    joinDate: null,
    description: "Room under maintenance - AC repair in progress",
  },
  {
    id: 8,
    roomNumber: "C-303",
    floor: 3,
    type: "triple",
    capacity: 3,
    occupied: 0,
    status: "vacant",
    rent: 5500,
    facilities: ["WiFi", "Shared Bathroom", "Study Table"],
    tenant: null,
    joinDate: null,
    description: "Triple sharing room newly renovated",
  },
];

export default function RoomManagement() {
  const [rooms, setRooms] = useState(mockRooms);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [floorFilter, setFloorFilter] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [view, setView] = useState("grid"); // "grid" or "table"

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = 
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.tenant && room.tenant.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === "all" || room.type === typeFilter;
    const matchesStatus = statusFilter === "all" || room.status === statusFilter;
    const matchesFloor = floorFilter === "all" || room.floor.toString() === floorFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesFloor;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vacant":
        return "bg-success text-success-foreground";
      case "occupied":
        return "bg-destructive text-destructive-foreground";
      case "partially_occupied":
        return "bg-warning text-warning-foreground";
      case "maintenance":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "vacant":
        return <CheckCircle className="h-4 w-4" />;
      case "occupied":
        return <XCircle className="h-4 w-4" />;
      case "partially_occupied":
        return <Clock className="h-4 w-4" />;
      case "maintenance":
        return <Settings className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "single":
        return "bg-blue-100 text-blue-800";
      case "double":
        return "bg-green-100 text-green-800";
      case "triple":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalRooms = rooms.length;
  const vacantRooms = rooms.filter(r => r.status === "vacant").length;
  const occupiedRooms = rooms.filter(r => r.status === "occupied").length;
  const maintenanceRooms = rooms.filter(r => r.status === "maintenance").length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Room Management</h1>
          <p className="text-muted-foreground">
            Track room availability, manage assignments, and monitor occupancy
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Room
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRooms}</div>
            <p className="text-xs text-muted-foreground">
              Across all floors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vacantRooms}</div>
            <p className="text-xs text-muted-foreground">
              Ready for occupancy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              {occupiedRooms} of {totalRooms} occupied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceRooms}</div>
            <p className="text-xs text-muted-foreground">
              Rooms under repair
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Room Directory</CardTitle>
              <CardDescription>
                Monitor and manage all rooms in real-time
              </CardDescription>
            </div>
            <Tabs value={view} onValueChange={setView}>
              <TabsList>
                <TabsTrigger value="grid">
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Grid View
                </TabsTrigger>
                <TabsTrigger value="table">
                  <Bed className="h-4 w-4 mr-2" />
                  Table View
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by room number or tenant name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="double">Double</SelectItem>
                <SelectItem value="triple">Triple</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="vacant">Vacant</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="partially_occupied">Partially Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={floorFilter} onValueChange={setFloorFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Floors</SelectItem>
                <SelectItem value="1">Floor 1</SelectItem>
                <SelectItem value="2">Floor 2</SelectItem>
                <SelectItem value="3">Floor 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={view}>
            <TabsContent value="grid">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredRooms.map((room) => (
                  <Card key={room.id} className="relative overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{room.roomNumber}</CardTitle>
                        <Badge className={getStatusColor(room.status)} variant="secondary">
                          {getStatusIcon(room.status)}
                          <span className="ml-1 capitalize">{room.status.replace('_', ' ')}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(room.type)} variant="outline">
                          {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                        </Badge>
                        <Badge variant="outline">
                          Floor {room.floor}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Occupancy</span>
                          <span className="text-sm font-medium">
                            {room.occupied}/{room.capacity}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Rent</span>
                          <span className="text-sm font-medium">₹{room.rent}/month</span>
                        </div>
                        {room.tenant && (
                          <div>
                            <span className="text-sm text-muted-foreground">Tenant(s)</span>
                            <p className="text-sm font-medium truncate">{room.tenant}</p>
                          </div>
                        )}
                        <div className="flex justify-between pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedRoom(room);
                              setViewDialogOpen(true);
                            }}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedRoom(room);
                              setEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Occupancy</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tenant(s)</TableHead>
                      <TableHead>Rent</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="font-medium">{room.roomNumber}</div>
                            <div className="text-sm text-muted-foreground">
                              Floor {room.floor}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(room.type)} variant="outline">
                            {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{room.occupied}/{room.capacity}</span>
                            {room.occupied < room.capacity && room.status !== "maintenance" && (
                              <User className="h-4 w-4 text-success" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(room.status)} variant="secondary">
                            {getStatusIcon(room.status)}
                            <span className="ml-1 capitalize">{room.status.replace('_', ' ')}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            {room.tenant ? (
                              <span className="text-sm">{room.tenant}</span>
                            ) : (
                              <span className="text-sm text-muted-foreground">Vacant</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">₹{room.rent}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedRoom(room);
                                  setViewDialogOpen(true);
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedRoom(room);
                                  setEditDialogOpen(true);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Room
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Assign Tenant
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          {filteredRooms.length === 0 && (
            <div className="text-center py-8">
              <Bed className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">No rooms found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No rooms match your current search and filter criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Room Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Room Details - {selectedRoom?.roomNumber}</DialogTitle>
            <DialogDescription>
              Complete information and current status
            </DialogDescription>
          </DialogHeader>
          {selectedRoom && (
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Room Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Room Number:</strong> {selectedRoom.roomNumber}</div>
                    <div><strong>Floor:</strong> {selectedRoom.floor}</div>
                    <div><strong>Type:</strong> {selectedRoom.type.charAt(0).toUpperCase() + selectedRoom.type.slice(1)}</div>
                    <div><strong>Capacity:</strong> {selectedRoom.capacity} person(s)</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Current Status</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Status:</strong> 
                      <Badge className={`ml-2 ${getStatusColor(selectedRoom.status)}`}>
                        {selectedRoom.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div><strong>Occupied:</strong> {selectedRoom.occupied}/{selectedRoom.capacity}</div>
                    <div><strong>Monthly Rent:</strong> ₹{selectedRoom.rent}</div>
                  </div>
                </div>
              </div>
              
              {selectedRoom.tenant && (
                <div>
                  <h4 className="font-medium mb-2">Current Tenant(s)</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name(s):</strong> {selectedRoom.tenant}</div>
                    {selectedRoom.joinDate && (
                      <div><strong>Join Date:</strong> {new Date(selectedRoom.joinDate).toLocaleDateString()}</div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Facilities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRoom.facilities.map((facility, index) => (
                    <Badge key={index} variant="outline">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedRoom.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
