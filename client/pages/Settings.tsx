import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Settings,
  Building2,
  Users,
  Bell,
  Shield,
  Database,
  Mail,
  Smartphone,
  Clock,
  DollarSign,
  Wifi,
  Zap,
  Droplets,
  Save,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Moon,
  Sun,
  Globe,
  Lock,
  Key,
  UserCog,
  Calendar,
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    hostelName: "HostelPro Management",
    hostelAddress: "123 University Street, City, State - 560001",
    contactEmail: "admin@hostelpro.com",
    contactPhone: "+91 9876543210",
    timezone: "Asia/Kolkata",
    currency: "INR",
    language: "en",
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    tenantNotifications: true,
    paymentReminders: true,
    maintenanceAlerts: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
    
    // System Settings
    autoBackup: true,
    backupFrequency: "daily",
    darkMode: false,
    dataRetention: 365,
    
    // Pricing Settings
    defaultRent: 8000,
    securityDepositMultiplier: 2,
    latePaymentFee: 100,
    
    // Meal Settings
    breakfastPrice: 50,
    lunchPrice: 80,
    dinnerPrice: 80,
    
    // Laundry Settings
    regularWashPrice: 25,
    expressWashPrice: 50,
    dryCleanPrice: 100,
    
    // Utility Settings
    electricityRate: 9,
    waterRate: 10,
    internetSpeed: "500 Mbps",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (section: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(`Saving ${section} settings:`, settings);
      setIsLoading(false);
    }, 1000);
  };

  const handleBackup = () => {
    console.log("Creating backup...");
    // Simulate backup creation
  };

  const handleRestore = () => {
    console.log("Restoring from backup...");
    // Simulate restore operation
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure system settings and administrative preferences
          </p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="gap-2">
            <Building2 className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="pricing" className="gap-2">
            <DollarSign className="h-4 w-4" />
            Pricing
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-2">
            <Settings className="h-4 w-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <UserCog className="h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Hostel Information
              </CardTitle>
              <CardDescription>
                Basic information about your hostel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hostelName">Hostel Name</Label>
                  <Input
                    id="hostelName"
                    value={settings.hostelName}
                    onChange={(e) => updateSetting('hostelName', e.target.value)}
                    placeholder="Enter hostel name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => updateSetting('contactPhone', e.target.value)}
                    placeholder="Enter contact phone"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hostelAddress">Address</Label>
                <Textarea
                  id="hostelAddress"
                  value={settings.hostelAddress}
                  onChange={(e) => updateSetting('hostelAddress', e.target.value)}
                  placeholder="Enter complete address"
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateSetting('contactEmail', e.target.value)}
                    placeholder="Enter contact email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.currency} onValueChange={(value) => updateSetting('currency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={() => handleSave('general')} disabled={isLoading}>
                {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <Label className="text-base">Email Notifications</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <Label className="text-base">SMS Notifications</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <Label className="text-base">Push Notifications</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive browser push notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <Label className="text-base">Tenant Activity Notifications</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get notified about tenant check-ins, check-outs, and requests
                    </p>
                  </div>
                  <Switch
                    checked={settings.tenantNotifications}
                    onCheckedChange={(checked) => updateSetting('tenantNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <Label className="text-base">Payment Reminders</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Send automatic payment reminders to tenants
                    </p>
                  </div>
                  <Switch
                    checked={settings.paymentReminders}
                    onCheckedChange={(checked) => updateSetting('paymentReminders', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <Label className="text-base">Maintenance Alerts</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get notified about maintenance requests and issues
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceAlerts}
                    onCheckedChange={(checked) => updateSetting('maintenanceAlerts', checked)}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('notifications')} disabled={isLoading}>
                {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Authentication
              </CardTitle>
              <CardDescription>
                Manage security settings and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <Label className="text-base">Two-Factor Authentication</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for admin login
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                      placeholder="Enter session timeout"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={settings.loginAttempts}
                      onChange={(e) => updateSetting('loginAttempts', parseInt(e.target.value))}
                      placeholder="Enter max attempts"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={settings.passwordExpiry}
                    onChange={(e) => updateSetting('passwordExpiry', parseInt(e.target.value))}
                    placeholder="Enter password expiry days"
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Set to 0 for no expiry
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Key className="h-4 w-4" />
                    Change Admin Password
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Security Log
                  </Button>
                </div>
              </div>

              <Button onClick={() => handleSave('security')} disabled={isLoading}>
                {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing Settings */}
        <TabsContent value="pricing" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Room Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Room Pricing</CardTitle>
                <CardDescription>Default pricing for rooms and deposits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultRent">Default Monthly Rent (₹)</Label>
                  <Input
                    id="defaultRent"
                    type="number"
                    value={settings.defaultRent}
                    onChange={(e) => updateSetting('defaultRent', parseInt(e.target.value))}
                    placeholder="Enter default rent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="securityDepositMultiplier">Security Deposit Multiplier</Label>
                  <Input
                    id="securityDepositMultiplier"
                    type="number"
                    value={settings.securityDepositMultiplier}
                    onChange={(e) => updateSetting('securityDepositMultiplier', parseInt(e.target.value))}
                    placeholder="Enter multiplier"
                  />
                  <p className="text-sm text-muted-foreground">
                    Security deposit = Monthly rent × Multiplier
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="latePaymentFee">Late Payment Fee (₹)</Label>
                  <Input
                    id="latePaymentFee"
                    type="number"
                    value={settings.latePaymentFee}
                    onChange={(e) => updateSetting('latePaymentFee', parseInt(e.target.value))}
                    placeholder="Enter late fee"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Meal Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Meal Pricing</CardTitle>
                <CardDescription>Pricing for different meal options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="breakfastPrice">Breakfast Price (₹)</Label>
                  <Input
                    id="breakfastPrice"
                    type="number"
                    value={settings.breakfastPrice}
                    onChange={(e) => updateSetting('breakfastPrice', parseInt(e.target.value))}
                    placeholder="Enter breakfast price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lunchPrice">Lunch Price (₹)</Label>
                  <Input
                    id="lunchPrice"
                    type="number"
                    value={settings.lunchPrice}
                    onChange={(e) => updateSetting('lunchPrice', parseInt(e.target.value))}
                    placeholder="Enter lunch price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dinnerPrice">Dinner Price (₹)</Label>
                  <Input
                    id="dinnerPrice"
                    type="number"
                    value={settings.dinnerPrice}
                    onChange={(e) => updateSetting('dinnerPrice', parseInt(e.target.value))}
                    placeholder="Enter dinner price"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Laundry Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Laundry Pricing</CardTitle>
                <CardDescription>Pricing for laundry services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="regularWashPrice">Regular Wash (₹)</Label>
                  <Input
                    id="regularWashPrice"
                    type="number"
                    value={settings.regularWashPrice}
                    onChange={(e) => updateSetting('regularWashPrice', parseInt(e.target.value))}
                    placeholder="Enter regular wash price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expressWashPrice">Express Wash (₹)</Label>
                  <Input
                    id="expressWashPrice"
                    type="number"
                    value={settings.expressWashPrice}
                    onChange={(e) => updateSetting('expressWashPrice', parseInt(e.target.value))}
                    placeholder="Enter express wash price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dryCleanPrice">Dry Clean (₹)</Label>
                  <Input
                    id="dryCleanPrice"
                    type="number"
                    value={settings.dryCleanPrice}
                    onChange={(e) => updateSetting('dryCleanPrice', parseInt(e.target.value))}
                    placeholder="Enter dry clean price"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Utility Rates */}
            <Card>
              <CardHeader>
                <CardTitle>Utility Rates</CardTitle>
                <CardDescription>Pricing for utilities and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="electricityRate">Electricity Rate (₹/kWh)</Label>
                  <Input
                    id="electricityRate"
                    type="number"
                    value={settings.electricityRate}
                    onChange={(e) => updateSetting('electricityRate', parseInt(e.target.value))}
                    placeholder="Enter electricity rate"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waterRate">Water Rate (₹/1000L)</Label>
                  <Input
                    id="waterRate"
                    type="number"
                    value={settings.waterRate}
                    onChange={(e) => updateSetting('waterRate', parseInt(e.target.value))}
                    placeholder="Enter water rate"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="internetSpeed">Internet Speed</Label>
                  <Input
                    id="internetSpeed"
                    value={settings.internetSpeed}
                    onChange={(e) => updateSetting('internetSpeed', e.target.value)}
                    placeholder="Enter internet speed"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Button onClick={() => handleSave('pricing')} disabled={isLoading} className="w-full">
            {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Pricing Settings
          </Button>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup & Restore
                </CardTitle>
                <CardDescription>
                  Manage system backups and data restoration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Automatic Backup</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable automatic daily backups
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select value={settings.backupFrequency} onValueChange={(value) => updateSetting('backupFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleBackup} variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Create Backup
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Restore Backup
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Restore from Backup</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will restore your system to a previous backup. All current data will be replaced. Are you sure you want to continue?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRestore}>
                          Restore
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
                <CardDescription>
                  General system configuration options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      <Label className="text-base">Dark Mode</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode interface
                    </p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention (days)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => updateSetting('dataRetention', parseInt(e.target.value))}
                    placeholder="Enter retention period"
                  />
                  <p className="text-sm text-muted-foreground">
                    How long to keep deleted records before permanent removal
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                Current system status and information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Version</Label>
                  <div className="font-medium">v1.0.0</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Last Backup</Label>
                  <div className="font-medium">2024-03-15 08:30</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Database Size</Label>
                  <div className="font-medium">45.2 MB</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Uptime</Label>
                  <div className="font-medium">7 days, 14 hours</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={() => handleSave('system')} disabled={isLoading} className="w-full">
            {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save System Settings
          </Button>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="h-5 w-5" />
                Administrator Accounts
              </CardTitle>
              <CardDescription>
                Manage admin users and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                      A
                    </div>
                    <div>
                      <div className="font-medium">Admin User</div>
                      <div className="text-sm text-muted-foreground">admin@hostelpro.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge>Super Admin</Badge>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                <Button className="gap-2">
                  <UserCog className="h-4 w-4" />
                  Add New Admin
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permission Settings</CardTitle>
              <CardDescription>
                Configure access permissions for different user roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Admin Permissions</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <Label className="text-sm">Tenant Management</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <Label className="text-sm">Room Management</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <Label className="text-sm">Financial Reports</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <Label className="text-sm">System Settings</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Staff Permissions</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <Label className="text-sm">View Tenants</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <Label className="text-sm">Edit Tenants</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <Label className="text-sm">View Reports</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <Label className="text-sm">System Settings</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
