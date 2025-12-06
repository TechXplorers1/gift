
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, CheckCircle, CreditCard, Gift, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    read: false,
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    title: "Booking Confirmed: #BK-8462",
    description: "Your 'Premium Detail' for August 28, 2024 is confirmed.",
    timestamp: "10 minutes ago",
  },
  {
    id: 2,
    read: false,
    icon: <Truck className="h-5 w-5 text-blue-500" />,
    title: "Cleaner is on the way!",
    description: "Your detailer, Grace, is heading to your location. ETA: 15 minutes.",
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    read: true,
    icon: <CreditCard className="h-5 w-5 text-primary" />,
    title: "Payment Received Successfully",
    description: "Thank you for your payment of $199.00 for booking #BK-8457.",
    timestamp: "3 hours ago",
  },
  {
    id: 4,
    read: true,
    icon: <Gift className="h-5 w-5 text-yellow-500" />,
    title: "Your 15% promo has been applied!",
    description: "Your 'WELCOME15' coupon was successfully added to your next booking.",
    timestamp: "1 day ago",
  },
];

type Notification = typeof notifications[0];

export default function NotificationsPage() {
    const [notificationList, setNotificationList] = React.useState(notifications);

    const markAsRead = (id: number) => {
        setNotificationList(
            notificationList.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotificationList(notificationList.map(n => ({...n, read: true})));
    };

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <Button variant="outline" onClick={markAllAsRead}>Mark All as Read</Button>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent account and booking updates.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationList.map((item: Notification) => (
                <div 
                    key={item.id} 
                    className={cn(
                        "flex items-start gap-4 p-4 rounded-lg border transition-colors",
                        !item.read ? 'bg-muted/50' : 'bg-background'
                    )}
                >
                    <div className="p-2 bg-muted rounded-full">{item.icon}</div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    {!item.read && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(item.id)}>Mark as read</Button>
                    )}
                </div>
            ))}
            {notificationList.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <Bell className="mx-auto h-12 w-12 mb-4" />
                    <p>You have no new notifications.</p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
