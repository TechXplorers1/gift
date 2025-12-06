
"use client"

import * as React from "react"
import {
  ChevronDown,
  MoreHorizontal,
  PlusCircle,
  Search,
  File,
  X,
  CalendarIcon,
  User,
  Clock,
  Car,
  Home,
  Star,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// Mock Data for Bookings
const bookings = [
  { id: 'BK-8462', customer: 'Liam Johnson', email: 'liam@example.com', service: 'Premium Detail', assignedStaff: 'Grace Founder', status: 'Completed', date: '2024-08-15 10:00 AM' },
  { id: 'BK-8461', customer: 'Olivia Smith', email: 'olivia@example.com', service: 'Deep House Clean', assignedStaff: 'John Sparkle', status: 'Confirmed', date: '2024-08-18 02:00 PM' },
  { id: 'BK-8460', customer: 'Noah Williams', email: 'noah@example.com', service: 'Combo Deal', assignedStaff: 'Emily Shine', status: 'In Progress', date: '2024-08-19 09:00 AM' },
  { id: 'BK-8459', customer: 'Emma Brown', email: 'emma@example.com', service: 'Basic Wash', assignedStaff: 'Grace Founder', status: 'Pending', date: '2024-08-20 11:00 AM' },
  { id: 'BK-8458', customer: 'Ava Jones', email: 'ava@example.com', service: 'Deep House Clean', assignedStaff: 'John Sparkle', status: 'Cancelled', date: '2024-08-14 01:00 PM' },
  { id: 'BK-8457', customer: 'William Garcia', email: 'william@example.com', service: 'Premium Detail', assignedStaff: 'Emily Shine', status: 'Completed', date: '2024-08-13 03:00 PM' },
];

type Booking = typeof bookings[0];

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'default';
    case 'confirmed':
      return 'secondary';
    case 'in progress':
      return 'outline';
    case 'pending':
      return 'destructive';
    case 'cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
};


export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState("all");
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const bookingsByStatus = React.useMemo(() => {
    if (activeTab === 'all') {
      return bookings;
    }
    return bookings.filter(b => b.status.toLowerCase().replace(" ", "-") === activeTab);
  }, [activeTab]);

  const filteredBookings = React.useMemo(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    return bookingsByStatus.filter((booking) => {
      return (
        booking.customer.toLowerCase().includes(lowercasedFilter) ||
        booking.email.toLowerCase().includes(lowercasedFilter) ||
        booking.id.toLowerCase().includes(lowercasedFilter)
      );
    });
  }, [searchTerm, bookingsByStatus]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const filterBookings = (status: string) => {
    setActiveTab(status);
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  }

  const getServiceIcon = (service: string) => {
    if (service.toLowerCase().includes('auto') || service.toLowerCase().includes('wash') || service.toLowerCase().includes('detail')) return <Car className="h-5 w-5 mr-2" />;
    if (service.toLowerCase().includes('home') || service.toLowerCase().includes('house')) return <Home className="h-5 w-5 mr-2" />;
    if (service.toLowerCase().includes('combo')) return <Star className="h-5 w-5 mr-2" />;
    return <Star className="h-5 w-5 mr-2" />;
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="flex flex-col w-full">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Bookings Management</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={filterBookings} className="w-full mt-4">
          <div className="flex items-center">
              <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                      </span>
                      <ChevronDown className="h-4 w-4" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                      Date
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Service Type</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                      Status
                      </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Export
                  </span>
                  </Button>
                  <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-rap">
                      Add Booking
                  </span>
                  </Button>
              </div>
          </div>
          <TabsContent value={activeTab} className="w-full">
              <Card className="mt-4">
                  <CardHeader>
                      <CardTitle>Bookings</CardTitle>
                      <CardDescription>
                      Manage your bookings and view their details.
                      </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="pb-4">
                          <div className="relative">
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                              type="search"
                              placeholder="Search by customer, email, or booking ID..."
                              className="pl-8 sm:w-1/2 md:w-1/3"
                              value={searchTerm}
                              onChange={handleSearch}
                              />
                          </div>
                      </div>
                      <Table>
                      <TableHeader>
                          <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Assigned To</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>
                              <span className="sr-only">Actions</span>
                          </TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {filteredBookings.map((booking: Booking) => (
                          <TableRow key={booking.id}>
                              <TableCell>
                              <div className="font-medium">{booking.customer}</div>
                              <div className="text-sm text-muted-foreground">
                                  {booking.email}
                              </div>
                              </TableCell>
                              <TableCell>{booking.service}</TableCell>
                              <TableCell>
                              <Badge variant={getStatusVariant(booking.status)}>
                                  {booking.status}
                              </Badge>
                              </TableCell>
                              <TableCell>{booking.assignedStaff}</TableCell>
                              <TableCell>{booking.date}</TableCell>
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
                                  <DropdownMenuItem onSelect={() => handleViewDetails(booking)}>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                                  <DropdownMenuItem>Assign Staff</DropdownMenuItem>
                                  <DropdownMenuItem>Change Status</DropdownMenuItem>
                                  <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                              </TableCell>
                          </TableRow>
                          ))}
                      </TableBody>
                      </Table>
                  </CardContent>
              </Card>
          </TabsContent>
        </Tabs>
      </div>

      {selectedBooking && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details: {selectedBooking.id}</DialogTitle>
            <DialogDescription>
              Detailed information for the booking.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                  {getServiceIcon(selectedBooking.service)}
                  <p className="font-semibold">{selectedBooking.service}</p>
              </div>
               <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-2"/>
                  <span>{selectedBooking.customer} ({selectedBooking.email})</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 mr-2"/>
                  <span>{selectedBooking.date.split(' ')[0]}</span>
              </div>
               <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2"/>
                  <span>{selectedBooking.date.split(' ')[1]} {selectedBooking.date.split(' ')[2]}</span>
              </div>
              <div className="flex items-center text-sm">
                  <strong className="mr-2">Status:</strong> <Badge variant={getStatusVariant(selectedBooking.status)}>{selectedBooking.status}</Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-2"/>
                  <span>Assigned to: {selectedBooking.assignedStaff}</span>
              </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
