
"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Star,
  CheckCircle,
  XCircle,
  MessageSquare,
  Search
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


// Mock Data for Reviews
const reviews = [
  { id: 'REV-001', customer: 'Sarah L.', avatar: 'https://placehold.co/100x100', rating: 5, review: "Absolutely blessed by their service! My car has never looked better...", status: 'Approved', service: 'Auto Detailing' },
  { id: 'REV-002', customer: 'Michael R.', avatar: 'https://placehold.co/100x100', rating: 5, review: "The house cleaning was phenomenal. Left our home feeling so fresh.", status: 'Approved', service: 'House Cleaning' },
  { id: 'REV-003', customer: 'Emily T.', avatar: 'https://placehold.co/100x100', rating: 4, review: "Great job on my SUV. A bit pricey but the quality is there.", status: 'Pending', service: 'Auto Detailing' },
  { id: 'REV-004', customer: 'Robert G.', avatar: 'https://placehold.co/100x100', rating: 5, review: "I was blown away. They didn't miss a single spot. Very trustworthy.", status: 'Approved', service: 'Combo Deal' },
  { id: 'REV-005', customer: 'Daniel B.', avatar: 'https://placehold.co/100x100', rating: 3, review: "It was an okay service. They missed a few spots on the windows.", status: 'Pending', service: 'House Cleaning' },
];

type Review = typeof reviews[0];

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'rejected':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function ReviewsPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [activeTab, setActiveTab] = React.useState("all");

    const reviewsByService = React.useMemo(() => {
        if (activeTab === 'all') {
            return reviews;
        }
        const serviceMapping: { [key: string]: string } = {
            'auto-detailing': 'Auto Detailing',
            'house-cleaning': 'House Cleaning',
            'combo-deal': 'Combo Deal',
        };
        return reviews.filter(r => r.service === serviceMapping[activeTab]);
    }, [activeTab]);

    const filteredReviews = React.useMemo(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        return reviewsByService.filter(review =>
            review.customer.toLowerCase().includes(lowercasedFilter) ||
            review.review.toLowerCase().includes(lowercasedFilter)
        );
    }, [searchTerm, reviewsByService]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reviews & Feedback</h2>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="auto-detailing">Auto Detailing</TabsTrigger>
            <TabsTrigger value="house-cleaning">House Cleaning</TabsTrigger>
            <TabsTrigger value="combo-deal">Combo Deal</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={activeTab} className="w-full">
          <Card className="mt-4">
            <CardHeader>
                <CardTitle>Manage Testimonials</CardTitle>
                <CardDescription>Approve, reject, and respond to customer feedback.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="pb-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by customer or review content..."
                            className="pl-8 sm:w-1/2 md:w-1/3"
                            onChange={handleSearch}
                            value={searchTerm}
                        />
                    </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Review</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReviews.map((review: Review) => (
                      <TableRow key={review.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                              <Avatar className="hidden h-9 w-9 sm:flex">
                                  <AvatarImage src={review.avatar} alt={review.customer} data-ai-hint="person portrait" />
                                  <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{review.customer}</div>
                          </div>
                        </TableCell>
                        <TableCell>{review.service}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {Array(review.rating).fill(0).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                             {Array(5 - review.rating).fill(0).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-gray-300" />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-sm truncate">{review.review}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(review.status)}>
                            {review.status}
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
                              <DropdownMenuItem><CheckCircle className="mr-2 h-4 w-4"/>Approve</DropdownMenuItem>
                              <DropdownMenuItem><XCircle className="mr-2 h-4 w-4"/>Reject</DropdownMenuItem>
                              <DropdownMenuItem><MessageSquare className="mr-2 h-4 w-4"/>Reply</DropdownMenuItem>
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
  );
}
