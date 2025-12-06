
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const bookings = [
  { service: "Premium Detail", date: "Aug 28, 2024", status: "Confirmed", payment: "Paid" },
  { service: "Deep House Clean", date: "Jul 15, 2024", status: "Completed", payment: "Paid" },
  { service: "Basic Wash", date: "Jun 01, 2024", status: "Completed", payment: "Paid" },
  { service: "Combo Deal", date: "May 20, 2024", status: "Cancelled", payment: "Refunded" },
];

export default function MyBookingsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed": return "default";
      case "Completed": return "secondary";
      case "Cancelled": return "destructive";
      default: return "outline";
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <Card key={index}>
            <CardContent className="p-4 grid grid-cols-2 md:grid-cols-5 items-center gap-4">
              <div>
                <p className="font-semibold">{booking.service}</p>
                <p className="text-sm text-muted-foreground">{booking.date}</p>
              </div>
              <div className="hidden md:block"><Badge variant={getStatusBadge(booking.status)}>{booking.status}</Badge></div>
              <div className="hidden md:block"><Badge variant={booking.payment === "Paid" ? "default" : "secondary"}>{booking.payment}</Badge></div>
              <div className="md:hidden text-right">
                <Badge variant={getStatusBadge(booking.status)}>{booking.status}</Badge>
              </div>
              <div className="flex justify-end gap-2 col-span-2 md:col-span-2">
                <Button variant="outline" size="sm">View Details</Button>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-5 w-5"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Cancel</DropdownMenuItem>
                        <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                        <DropdownMenuItem>Rebook Same Service</DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
