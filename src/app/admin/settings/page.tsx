
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import Image from "next/image";

export default function SettingsPage() {
  const [is2faDialogOpen, setIs2faDialogOpen] = React.useState(false);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <Button>Save Changes</Button>
      </div>
      <Tabs defaultValue="company" className="w-full space-y-6">
        <TabsList>
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="service-area">Service Area</TabsTrigger>
          <TabsTrigger value="taxes">Tax Rates</TabsTrigger>
          <TabsTrigger value="payment">Payment Gateways</TabsTrigger>
          <TabsTrigger value="notifications">Email/SMS Templates</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your business details, contact info, and branding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" defaultValue="Gift Auto Mobile Detailing & House Cleaning" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="slogan">Slogan/Motto</Label>
                  <Input id="slogan" defaultValue="A Gift of Clean – Renewed by Grace" />
                </div>
              </div>
              <div className="space-y-1">
                  <Label htmlFor="address">Main Address</Label>
                  <Input id="address" defaultValue="123 Clean Street, Portland, OR, 97201" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(503) 555-1234" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="hello@giftauto.com" />
                </div>
              </div>
               <div className="space-y-2">
                <Label>Logo Upload</Label>
                <Input type="file" />
                <p className="text-sm text-muted-foreground">Upload a new logo to update it across the website.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service-area">
          <Card>
            <CardHeader>
              <CardTitle>Service Radius & Area</CardTitle>
              <CardDescription>Define where your services are available and set travel fees.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Map placeholder for setting service radius.</p>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="taxes">
          <Card>
            <CardHeader>
              <CardTitle>Tax Rates</CardTitle>
              <CardDescription>Manage tax settings for your services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor="default-tax" className="flex-grow">Default Tax Rate (%)</Label>
                <Input id="default-tax" type="number" defaultValue="8" className="w-24" />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor="tax-included" className="flex-grow">Show prices with tax included</Label>
                <Switch id="tax-included" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Setup</CardTitle>
              <CardDescription>Connect and manage your payment providers like Stripe and PayPal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                  <Label htmlFor="stripe-key">Stripe API Key</Label>
                  <Input id="stripe-key" type="password" placeholder="••••••••••••••••••••••" />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor="stripe-enabled" className="flex-grow">Enable Stripe Payments</Label>
                <Switch id="stripe-enabled" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor="paypal-enabled" className="flex-grow">Enable PayPal Payments</Label>
                <Switch id="paypal-enabled" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Email & SMS Templates</CardTitle>
              <CardDescription>Customize the messages sent to your customers and staff.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="template-select">Select a template to edit:</Label>
                <Select>
                  <SelectTrigger id="template-select">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmation">Booking Confirmation</SelectItem>
                    <SelectItem value="reminder">Service Reminder</SelectItem>
                    <SelectItem value="receipt">Payment Receipt</SelectItem>
                    <SelectItem value="feedback">Feedback Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea placeholder="Template content will be editable here..." rows={10} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
           <Dialog open={is2faDialogOpen} onOpenChange={setIs2faDialogOpen}>
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage passwords, two-factor authentication, and other security features.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <Label>Two-Factor Authentication (2FA)</Label>
                      <p className="text-sm text-muted-foreground">Enhance account security by requiring a second verification step.</p>
                    </div>
                    <DialogTrigger asChild>
                      <Button variant="outline">Enable 2FA</Button>
                    </DialogTrigger>
                </div>
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <Label>Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">Set the duration of inactivity before users are logged out.</p>
                    </div>
                     <Select defaultValue="30">
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="15">15 Minutes</SelectItem>
                            <SelectItem value="30">30 Minutes</SelectItem>
                            <SelectItem value="60">1 Hour</SelectItem>
                             <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </CardContent>
            </Card>
             <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
                  <DialogDescription>
                    Scan the QR code with your authenticator app and enter the code to verify.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                  <Image src="https://placehold.co/200x200" alt="QR Code Placeholder" width={200} height={200} data-ai-hint="qr code"/>
                  <div className="w-full space-y-2">
                    <Label htmlFor="verification-code">Verification Code</Label>
                    <Input id="verification-code" placeholder="Enter 6-digit code" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="secondary" onClick={() => setIs2faDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Verify & Enable</Button>
                </DialogFooter>
              </DialogContent>
           </Dialog>
            <Card>
              <CardHeader>
                <CardTitle>User Roles & Permissions</CardTitle>
                <CardDescription>Control what different users can see and do in the admin panel.</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">What it does:</h4>
                <p className="text-sm text-muted-foreground mb-4">Controls who can access which parts of the system.</p>
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Create Roles (Admin, Manager, Staff, Viewer)</li>
                  <li>Set Permissions (e.g., can view bookings but not edit payments)</li>
                  <li>Assign Roles to Users</li>
                  <li>Audit Logs (see who made changes in the system)</li>
                  <li>Ability to temporarily disable user accounts</li>
                </ul>
              </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
