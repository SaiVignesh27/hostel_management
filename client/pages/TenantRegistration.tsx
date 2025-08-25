import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Users,
  Upload,
  X,
  Calendar as CalendarIcon,
  User,
  Phone,
  Mail,
  CreditCard,
  Home,
  FileText,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react";

// Validation schema
const tenantRegistrationSchema = z.object({
  // Personal Details
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  age: z.number().min(18, "Age must be at least 18").max(100, "Age must be less than 100"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[+]?[0-9]{10,15}$/, "Please enter a valid phone number"),
  emergencyContact: z.string().regex(/^[+]?[0-9]{10,15}$/, "Please enter a valid emergency contact"),
  
  // Address
  permanentAddress: z.string().min(10, "Address must be at least 10 characters"),
  
  // ID Proof
  idProofType: z.enum(["aadhar", "pan", "passport", "driving_license"], {
    required_error: "Please select an ID proof type",
  }),
  idProofNumber: z.string().min(5, "ID proof number is required"),
  
  // Room Assignment
  roomNumber: z.string().min(1, "Please select a room"),
  
  // Financial Details
  monthlyRent: z.number().min(1000, "Monthly rent must be at least ₹1000"),
  securityDeposit: z.number().min(1000, "Security deposit must be at least ₹1000"),
  
  // Dates
  joiningDate: z.date({
    required_error: "Please select a joining date",
  }),
  
  // Preferences
  mealPreference: z.enum(["veg", "non_veg"], {
    required_error: "Please select meal preference",
  }),
  mealPlan: z.array(z.string()).min(1, "Please select at least one meal"),
  
  // Additional Info
  occupation: z.string().min(2, "Occupation is required"),
  notes: z.string().optional(),
});

type TenantRegistrationForm = z.infer<typeof tenantRegistrationSchema>;

// Mock available rooms
const availableRooms = [
  { id: "A-103", name: "A-103", type: "Single", rent: 8500, floor: 1 },
  { id: "B-202", name: "B-202", type: "Double", rent: 6000, floor: 2 },
  { id: "C-303", name: "C-303", type: "Triple", rent: 5500, floor: 3 },
  { id: "B-204", name: "B-204", type: "Double", rent: 6000, floor: 2 },
  { id: "A-105", name: "A-105", type: "Single", rent: 8500, floor: 1 },
];

export default function TenantRegistration() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<TenantRegistrationForm>({
    resolver: zodResolver(tenantRegistrationSchema),
    defaultValues: {
      mealPlan: [],
      mealPreference: "veg",
    },
  });

  const selectedRoom = form.watch("roomNumber");
  const roomDetails = availableRooms.find(room => room.id === selectedRoom);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles = [...uploadedFiles, ...files];
    
    // Limit to 5 files
    if (newFiles.length > 5) {
      alert("Maximum 5 files allowed");
      return;
    }

    setUploadedFiles(newFiles);
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    
    // Cleanup URL
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    
    setUploadedFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  const onSubmit = async (data: TenantRegistrationForm) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Tenant registration data:", data);
      console.log("Uploaded files:", uploadedFiles);
      setIsSubmitting(false);
      navigate("/tenants");
    }, 2000);
  };

  const mealOptions = [
    { id: "breakfast", label: "Breakfast", price: 50 },
    { id: "lunch", label: "Lunch", price: 80 },
    { id: "dinner", label: "Dinner", price: 80 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/tenants")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tenants
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Tenant Registration</h1>
            <p className="text-muted-foreground">
              Add a new tenant with complete details and documentation
            </p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Basic details about the tenant
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter age"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email address" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 9876543210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 9876543210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter occupation" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="permanentAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Permanent Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter permanent address"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* ID Proof Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    ID Proof Details
                  </CardTitle>
                  <CardDescription>
                    Identity verification documents
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="idProofType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Proof Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select ID proof type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="aadhar">Aadhar Card</SelectItem>
                              <SelectItem value="pan">PAN Card</SelectItem>
                              <SelectItem value="passport">Passport</SelectItem>
                              <SelectItem value="driving_license">Driving License</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="idProofNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Proof Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter ID proof number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Room Assignment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Room Assignment
                  </CardTitle>
                  <CardDescription>
                    Select room and financial details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="roomNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Number</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select available room" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableRooms.map((room) => (
                                <SelectItem key={room.id} value={room.id}>
                                  {room.name} - {room.type} (Floor {room.floor}) - ₹{room.rent}/month
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="joiningDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Joining Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {roomDetails && (
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <h4 className="font-medium mb-2">Selected Room Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Room Type:</span>
                          <span className="ml-2 font-medium">{roomDetails.type}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Floor:</span>
                          <span className="ml-2 font-medium">{roomDetails.floor}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Monthly Rent:</span>
                          <span className="ml-2 font-medium">₹{roomDetails.rent}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Security Deposit:</span>
                          <span className="ml-2 font-medium">₹{roomDetails.rent * 2}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="monthlyRent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Rent</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter monthly rent"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                              value={roomDetails?.rent || field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="securityDeposit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Security Deposit</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter security deposit"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                              value={roomDetails ? roomDetails.rent * 2 : field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Meal Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Meal Preferences
                  </CardTitle>
                  <CardDescription>
                    Select dietary preferences and meal plans
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="mealPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dietary Preference</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select dietary preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="veg">Vegetarian</SelectItem>
                            <SelectItem value="non_veg">Non-Vegetarian</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mealPlan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meal Plan</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {mealOptions.map((meal) => (
                            <label
                              key={meal.id}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={field.value?.includes(meal.id)}
                                onChange={(e) => {
                                  const value = field.value || [];
                                  if (e.target.checked) {
                                    field.onChange([...value, meal.id]);
                                  } else {
                                    field.onChange(value.filter((v) => v !== meal.id));
                                  }
                                }}
                                className="rounded"
                              />
                              <Badge variant="outline">
                                {meal.label} (₹{meal.price})
                              </Badge>
                            </label>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Additional Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional information or special requirements..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Document Upload Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Document Upload
                  </CardTitle>
                  <CardDescription>
                    Upload required documents (Max 5 files)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <div className="text-sm">
                        <span className="font-medium text-primary hover:text-primary/80">
                          Click to upload
                        </span>
                        <span className="text-muted-foreground"> or drag and drop</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        PDF, PNG, JPG up to 10MB each
                      </p>
                    </label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Uploaded Files</h4>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {file.type.startsWith('image/') && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  // Preview image
                                  const url = previewUrls[index];
                                  window.open(url, '_blank');
                                }}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium mb-1">Required Documents:</p>
                    <ul className="space-y-1">
                      <li>• ID Proof (Aadhar/PAN/Passport)</li>
                      <li>• Passport Size Photo</li>
                      <li>• Address Proof (Optional)</li>
                      <li>• Income Proof (Optional)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Registration Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    {form.formState.isValid ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-warning" />
                    )}
                    <span className="text-sm">
                      {form.formState.isValid ? "Form is complete" : "Complete required fields"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {uploadedFiles.length > 0 ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-warning" />
                    )}
                    <span className="text-sm">
                      {uploadedFiles.length > 0 
                        ? `${uploadedFiles.length} documents uploaded` 
                        : "Upload required documents"
                      }
                    </span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || !form.formState.isValid}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Register Tenant
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
