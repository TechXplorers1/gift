
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, CreditCard, Users, Clock, PlusCircle, UserPlus, Tag } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const kpiData = [
  { title: "Today's Bookings", value: "12", icon: <Clock className="h-6 w-6 text-muted-foreground" /> },
  { title: "Monthly Revenue", value: "$8,450", icon: <DollarSign className="h-6 w-6 text-muted-foreground" /> },
  { title: "Pending Approvals", value: "3", icon: <CreditCard className="h-6 w-6 text-muted-foreground" /> },
  { title: "Active Staff", value: "8", icon: <Users className="h-6 w-6 text-muted-foreground" /> },
];

const chartData = [
  { name: 'Jan', Auto: 40, Home: 24 },
  { name: 'Feb', Auto: 30, Home: 13 },
  { name: 'Mar', Auto: 50, Home: 28 },
  { name: 'Apr', Auto: 47, Home: 39 },
  { name: 'May', Auto: 60, Home: 48 },
  { name: 'Jun', Auto: 55, Home: 35 },
];

const recentBookings = [
    { id: 'BK-8462', customer: 'Liam Johnson', service: 'Premium Detail', date: '2024-08-15 10:00 AM', status: 'Confirmed' },
    { id: 'BK-8461', customer: 'Olivia Smith', service: 'Deep House Clean', date: '2024-08-15 02:00 PM', status: 'Confirmed' },
    { id: 'BK-8460', customer: 'Noah Williams', service: 'Combo Deal', date: '2024-08-16 09:00 AM', status: 'Pending' },
    { id: 'BK-8459', customer: 'Emma Brown', service: 'Basic Wash', date: '2024-08-16 11:00 AM', status: 'Completed' },
];

export default function AdminPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {kpi.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
             <CardDescription>Auto vs. Home services over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="Auto" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Home" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>A list of recently scheduled services.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentBookings.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell>
                                <div className="font-medium">{booking.customer}</div>
                                <div className="text-sm text-muted-foreground">{booking.date}</div>
                            </TableCell>
                            <TableCell>{booking.service}</TableCell>
                            <TableCell><Badge>{booking.status}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
