
"use client"

import * as React from "react"
import {
  MoreHorizontal,
  PlusCircle,
  Search,
  File,
  Download,
  Printer,
  CreditCard,
  DollarSign
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// Mock Data for Transactions
const transactions = [
  { id: 'TRN-1001', bookingId: 'BK-8462', customer: 'Liam Johnson', amount: 99.00, method: 'Credit Card', status: 'Paid', date: '2024-08-15' },
  { id: 'TRN-1002', bookingId: 'BK-8461', customer: 'Olivia Smith', amount: 189.00, method: 'PayPal', status: 'Paid', date: '2024-08-18' },
  { id: 'TRN-1003', bookingId: 'BK-8460', customer: 'Noah Williams', amount: 350.00, method: 'Credit Card', status: 'Pending', date: '2024-08-19' },
  { id: 'TRN-1004', bookingId: 'BK-8458', customer: 'Ava Jones', amount: 189.00, method: 'Credit Card', status: 'Refunded', date: '2024-08-14' },
  { id: 'TRN-1005', bookingId: 'BK-8457', customer: 'William Garcia', amount: 199.00, method: 'Credit Card', status: 'Paid', date: '2024-08-13' },
  { id: 'TRN-1006', bookingId: 'BK-8459', customer: 'Emma Brown', amount: 99.00, method: 'PayPal', status: 'Paid', date: '2024-08-20' },
];

type Transaction = typeof transactions[0];

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'refunded':
      return 'destructive';
    default:
      return 'outline';
  }
};

const revenueData = [
  { service: 'Auto', revenue: 4500 },
  { service: 'House', revenue: 3200 },
  { service: 'Combo', revenue: 5100 },
];


export default function PaymentsPage() {
  const [filteredTransactions, setFilteredTransactions] = React.useState(transactions);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = transactions.filter(transaction =>
      transaction.bookingId.toLowerCase().includes(searchTerm) ||
      transaction.customer.toLowerCase().includes(searchTerm) ||
      transaction.id.toLowerCase().includes(searchTerm)
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Payments & Invoices</h2>
        <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export Report
                </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    New Invoice
                </span>
            </Button>
        </div>
      </div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$12,800.00</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Invoices Paid</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
                <CardTitle>All Transactions</CardTitle>
                <CardDescription>Track revenue & transactions.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="pb-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                        type="search"
                        placeholder="Search by Booking ID, Customer..."
                        className="pl-8 sm:w-1/2 md:w-1/3"
                        onChange={handleSearch}
                        />
                    </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden md:table-cell">Booking ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden sm:table-cell">Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction: Transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div className="font-medium">{transaction.customer}</div>
                          <div className="text-sm text-muted-foreground">{transaction.date}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{transaction.bookingId}</TableCell>
                        <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell className="hidden sm:table-cell">{transaction.method}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                              >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem><Download className="mr-2 h-4 w-4"/>Download Invoice</DropdownMenuItem>
                              <DropdownMenuItem><Printer className="mr-2 h-4 w-4"/>Print Invoice</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Issue Refund</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </CardContent>
           </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Revenue by Service</CardTitle>
                    <CardDescription>Breakdown of revenue from different services.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData} layout="vertical" margin={{ left: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis type="category" dataKey="service" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--background))',
                                borderColor: 'hsl(var(--border))'
                              }}
                            />
                            <Legend />
                            <Bar dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

    