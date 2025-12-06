import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const services = [
  { id: 'SERV-001', name: 'Basic Wash', category: 'Auto Detailing', price: '$99+', status: 'Active' },
  { id: 'SERV-002', name: 'Premium Detail', category: 'Auto Detailing', price: '$199+', status: 'Active' },
  { id: 'SERV-003', name: 'Paint Correction', category: 'Auto Detailing', price: '$299+', status: 'Active' },
  { id: 'SERV-004', name: 'Deep Clean', category: 'House Cleaning', price: '$189+', status: 'Active' },
  { id: 'SERV-005', name: 'Move-In/Out Clean', category: 'House Cleaning', price: '$249+', status: 'Disabled' },
  { id: 'SERV-006', name: 'Regular Maintenance', category: 'House Cleaning', price: '$89+', status: 'Active' },
  { id: 'SERV-007', name: 'The Ultimate Clean Combo', category: 'Combo Deals', price: '20% Off', status: 'Active' },
];

export default function ServicesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Services &amp; Pricing</h2>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Manage Services</CardTitle>
            <CardDescription>Update pricing, descriptions, and availability of your offerings.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>
                      <Badge variant={service.status === 'Active' ? 'default' : 'secondary'}>
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Toggle Availability</DropdownMenuItem>
                          <DropdownMenuItem>Add Promotion</DropdownMenuItem>
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
