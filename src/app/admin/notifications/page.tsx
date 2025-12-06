
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Bell, Search, UserPlus, CreditCard, Trash2, Package, Check, Eye, MessageSquare, FileText, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const notifications = [
  {
    id: 1,
    type: "New Booking",
    icon: <UserPlus className="h-5 w-5 text-green-500" />,
    title: "New Booking: #BK-8463",
    description: "Liam Johnson booked a 'Premium Detail' for Aug 25, 2024, 10:00 AM. Payment pending.",
    timestamp: "5 minutes ago",
    read: false,
    priority: "High",
    actions: ["View", "Assign Staff", "Confirm"],
  },
  {
    id: 2,
    type: "Payment",
    icon: <CreditCard className="h-5 w-5 text-blue-500" />,
    title: "Payment Received: $199.00",
    description: "Payment for booking #BK-8457 (William Garcia) confirmed via Credit Card.",
    timestamp: "1 hour ago",
    read: false,
    priority: "Medium",
    actions: ["View Invoice", "Send Receipt"],
  },
  {
    id: 3,
    type: "Cancellation",
    icon: <Trash2 className="h-5 w-5 text-red-500" />,
    title: "Booking Cancelled: #BK-8458",
    description: "Ava Jones cancelled 'Deep House Clean'. Reason: Schedule conflict. Refund may be required.",
    timestamp: "3 hours ago",
    read: true,
    priority: "High",
    actions: ["Approve Refund", "Reschedule"],
  },
  {
    id: 4,
    type: "Staff Update",
    icon: <Bell className="h-5 w-5 text-purple-500" />,
    title: "Job Completed: #BK-8457",
    description: "Grace Founder marked 'Premium Detail' for William Garcia as completed.",
    timestamp: "5 hours ago",
    read: true,
    priority: "Low",
    actions: ["View Details", "Request Feedback"],
  },
    {
    id: 5,
    type: "Inventory",
    icon: <Package className="h-5 w-5 text-orange-500" />,
    title: "Low Inventory: All-Purpose Cleaner",
    description: "Stock is at 10%. Suggested reorder quantity: 5 gallons.",
    timestamp: "1 day ago",
    read: true,
    priority: "Medium",
    actions: ["Reorder", "View Supplier"],
  },
];

type Notification = typeof notifications[0];

export default function NotificationsPage() {
    const [typeFilter, setTypeFilter] = React.useState("all");
    const [readStatus, setReadStatus] = React.useState("all");
    const [searchTerm, setSearchTerm] = React.useState("");
    const router = useRouter();
    const { toast } = useToast();

    const filteredNotifications = React.useMemo(() => {
        return notifications.filter(notification => {
            const typeMatch = typeFilter === 'all' || notification.type.toLowerCase().replace(' ', '-') === typeFilter;
            const readMatch = readStatus === 'all' || (readStatus === 'read' && notification.read) || (readStatus === 'unread' && !notification.read);
            const searchMatch = searchTerm === '' ||
                notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notification.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            return typeMatch && readMatch && searchMatch;
        });
    }, [typeFilter, readStatus, searchTerm]);


    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case "High": return "destructive";
            case "Medium": return "secondary";
            default: return "outline";
        }
    };

    const getActionIcon = (action: string) => {
        switch (action) {
            case "View":
            case "View Details":
            case "View Invoice":
                return <Eye className="mr-2 h-4 w-4" />;
            case "Assign Staff":
            case "Reorder":
                return <UserPlus className="mr-2 h-4 w-4" />;
            case "Confirm":
            case "Approve Refund":
                return <Check className="mr-2 h-4 w-4" />;
            case "Send Receipt":
                return <FileText className="mr-2 h-4 w-4" />;
            case "Request Feedback":
                return <MessageSquare className="mr-2 h-4 w-4" />;
            default:
                return null;
        }
    }

    const handleActionClick = (action: string, item: Notification) => {
        switch (action) {
            case "View":
            case "View Details":
                router.push('/admin/bookings');
                break;
            case "View Invoice":
                router.push('/admin/payments');
                break;
            default:
                 toast({
                    title: "Action Triggered",
                    description: `Action: "${action}" on notification "${item.title}"`,
                });
                break;
        }
    };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Notifications Center</h2>
        <div className="flex items-center space-x-2">
            <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export Log</Button>
        </div>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Stay updated on bookings, payments, and staff actions in real-time.</CardDescription>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search notifications..." className="pl-8 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                 <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="new-booking">New Booking</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="cancellation">Cancellation</SelectItem>
                        <SelectItem value="staff-update">Staff Update</SelectItem>
                        <SelectItem value="inventory">Inventory</SelectItem>
                    </SelectContent>
                </Select>
                 <Select value={readStatus} onValueChange={setReadStatus}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Filter by read status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {filteredNotifications.map((item: Notification) => (
                    <div key={item.id} className={`flex items-start gap-4 p-4 rounded-lg border ${!item.read ? 'bg-muted/50' : 'bg-background'}`}>
                        <div className="p-2 bg-muted rounded-full">{item.icon}</div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">{item.title}</p>
                                <div className="flex items-center gap-2">
                                     <Badge variant={getPriorityBadge(item.priority)}>{item.priority}</Badge>
                                     <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                             <div className="flex gap-2 mt-2">
                                {item.actions.map(action => (
                                    <Button key={action} variant="outline" size="sm" onClick={() => handleActionClick(action, item)}>
                                        {getActionIcon(action)} {action}
                                    </Button>
                                ))}
                            </div>
                        </div>
                         {!item.read && <div className="h-2 w-2 rounded-full bg-primary mt-1"></div>}
                    </div>
                ))}
            </div>
        </CardContent>
       </Card>
    </div>
  );
}
