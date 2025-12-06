
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const serviceDemandData = [
  { name: 'Auto Detailing', bookings: 120 },
  { name: 'House Cleaning', bookings: 90 },
  { name: 'Combo Deals', bookings: 75 },
];

const peakTimesData = [
  { day: 'Mon', bookings: 25 },
  { day: 'Tue', bookings: 30 },
  { day: 'Wed', bookings: 45 },
  { day: 'Thu', bookings: 40 },
  { day: 'Fri', bookings: 60 },
  { day: 'Sat', bookings: 80 },
  { day: 'Sun', bookings: 35 },
];

const staffPerformanceData = [
    { name: 'Grace F.', jobs: 45, rating: 4.9 },
    { name: 'John S.', jobs: 38, rating: 4.8 },
    { name: 'Emily S.', jobs: 52, rating: 4.9 },
    { name: 'Mark C.', jobs: 30, rating: 4.7 },
    { name: 'Sarah S.', jobs: 41, rating: 4.8 },
];

const retentionData = [
  { name: 'New Customers', value: 400 },
  { name: 'Returning Customers', value: 600 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        <Select defaultValue="monthly">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Demand</CardTitle>
            <CardDescription>Bookings by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={serviceDemandData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}/>
                    <Legend />
                    <Bar dataKey="bookings" fill="hsl(var(--chart-1))" name="Bookings" />
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peak Booking Times</CardTitle>
            <CardDescription>Bookings throughout the week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={peakTimesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}/>
                    <Legend />
                    <Bar dataKey="bookings" fill="hsl(var(--chart-2))" name="Total Bookings"/>
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Staff Performance</CardTitle>
            <CardDescription>Jobs completed and average rating</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={staffPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" domain={[4, 5]} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="jobs" fill="hsl(var(--chart-1))" name="Jobs Completed" />
                <Bar yAxisId="right" dataKey="rating" fill="hsl(var(--chart-2))" name="Avg. Rating" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Retention</CardTitle>
            <CardDescription>New vs. returning customers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={retentionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {retentionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
