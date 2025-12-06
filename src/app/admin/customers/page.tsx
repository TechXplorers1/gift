
"use client"

import * as React from "react"
import {
  ChevronDown,
  MoreHorizontal,
  PlusCircle,
  Search,
  File,
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
  DropdownMenuCheckboxItem,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock Data for Customers
const customers = [
  { id: 'CUST-001', name: 'Liam Johnson', email: 'liam@example.com', phone: '503-555-0101', totalBookings: 5, lastService: '2024-08-15', avatar: 'https://placehold.co/100x100' },
  { id: 'CUST-002', name: 'Olivia Smith', email: 'olivia@example.com', phone: '503-555-0102', totalBookings: 3, lastService: '2024-08-18', avatar: 'https://placehold.co/100x100' },
  { id: 'CUST-003', name: 'Noah Williams', email: 'noah@example.com', phone: '503-555-0103', totalBookings: 8, lastService: '2024-08-19', avatar: 'https://placehold.co/100x100' },
  { id: 'CUST-004', name: 'Emma Brown', email: 'emma@example.com', phone: '503-555-0104', totalBookings: 1, lastService: '2024-08-20', avatar: 'https://placehold.co/100x100' },
  { id: 'CUST-005', name: 'Ava Jones', email: 'ava@example.com', phone: '503-555-0105', totalBookings: 12, lastService: '2024-07-25', avatar: 'https://placehold.co/100x100' },
  { id: 'CUST-006', name: 'William Garcia', email: 'william@example.com', phone: '503-555-0106', totalBookings: 2, lastService: '2024-08-13', avatar: 'https://placehold.co/100x100' },
];

type Customer = typeof customers[0];

export default function CustomersPage() {
  const [filteredCustomers, setFilteredCustomers] = React.useState(customers);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm) ||
        customer.phone.includes(searchTerm)
    );
    setFilteredCustomers(filtered);
  };

  return (
    <div className="flex flex-col w-full">
        <div className="flex items-center justify-between space-y-2">
            <h1 className="text-lg font-semibold md:text-2xl">Customer Management</h1>
            <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Export
                    </span>
                </Button>
                <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Customer
                    </span>
                </Button>
            </div>
        </div>
      
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>All Customers</CardTitle>
                <CardDescription>
                Manage your customers and view their service history.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="pb-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                        type="search"
                        placeholder="Search by name, email, or phone..."
                        className="pl-8 sm:w-1/2 md:w-1/3"
                        onChange={handleSearch}
                        />
                    </div>
                </div>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Phone</TableHead>
                    <TableHead className="hidden sm:table-cell">Total Bookings</TableHead>
                    <TableHead className="hidden sm:table-cell">Last Service</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCustomers.map((customer: Customer) => (
                    <TableRow key={customer.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src={customer.avatar} alt="Avatar" data-ai-hint="person portrait" />
                                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-0.5">
                                    <div className="font-medium">{customer.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {customer.email}
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{customer.phone}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline">{customer.totalBookings}</Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{customer.lastService}</TableCell>
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
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Info</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Apply Reward</DropdownMenuItem>
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
  );
}
