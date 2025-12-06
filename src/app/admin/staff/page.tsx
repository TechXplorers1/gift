
"use client"

import * as React from "react"
import {
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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

// Mock Data for Staff
const staffMembers = [
  { id: 'STAFF-001', name: 'Grace Founder', role: 'Lead Detailer', availability: 'Available', assignments: 5, avatar: 'https://placehold.co/100x100' },
  { id: 'STAFF-002', name: 'John Sparkle', role: 'House Cleaning Supervisor', availability: 'On Job', assignments: 1, avatar: 'https://placehold.co/100x100' },
  { id: 'STAFF-003', name: 'Emily Shine', role: 'Customer Relations', availability: 'Available', assignments: 0, avatar: 'https://placehold.co/100x100' },
  { id: 'STAFF-004', name: 'Mark Clean', role: 'Detailer', availability: 'Unavailable', assignments: 0, avatar: 'https://placehold.co/100x100' },
  { id: 'STAFF-005', name: 'Sarah Sweep', role: 'House Cleaner', availability: 'On Job', assignments: 1, avatar: 'https://placehold.co/100x100' },
];

type Staff = typeof staffMembers[0];

const getAvailabilityVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'available':
      return 'default';
    case 'on job':
      return 'secondary';
    case 'unavailable':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function StaffPage() {
  const [filteredStaff, setFilteredStaff] = React.useState(staffMembers);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = staffMembers.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm) ||
        staff.role.toLowerCase().includes(searchTerm)
    );
    setFilteredStaff(filtered);
  };

  return (
    <div className="flex flex-col w-full">
        <div className="flex items-center justify-between space-y-2">
            <h1 className="text-lg font-semibold md:text-2xl">Staff Management</h1>
            <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Export List
                    </span>
                </Button>
                <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Staff
                    </span>
                </Button>
            </div>
        </div>
      
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>All Staff Members</CardTitle>
                <CardDescription>
                Manage your employees and view their assignments.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="pb-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                        type="search"
                        placeholder="Search by name or role..."
                        className="pl-8 sm:w-1/2 md:w-1/3"
                        onChange={handleSearch}
                        />
                    </div>
                </div>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead className="hidden sm:table-cell">Active Assignments</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredStaff.map((staff: Staff) => (
                    <TableRow key={staff.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src={staff.avatar} alt="Avatar" data-ai-hint="person portrait" />
                                    <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{staff.name}</div>
                            </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{staff.role}</TableCell>
                        <TableCell>
                            <Badge variant={getAvailabilityVariant(staff.availability)}>
                                {staff.availability}
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-center">
                            {staff.assignments > 0 ? staff.assignments : "-"}
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
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                            <DropdownMenuItem>Assign Job</DropdownMenuItem>
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
