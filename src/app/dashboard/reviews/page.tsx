
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Edit, Trash2, Camera, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const pastReviews = [
  {
    service: "Premium Detail",
    date: "Aug 28, 2024",
    rating: 5,
    review: "The car looks absolutely brand new! The attention to detail is just incredible. Will definitely be booking again soon.",
  },
  {
    service: "Deep House Clean",
    date: "Jul 15, 2024",
    rating: 4,
    review: "Very happy with the cleaning service. The team was professional and thorough. They missed one small spot on the baseboards, but otherwise, it was perfect.",
  },
];

export default function MyReviewsPage() {
    const { toast } = useToast();
    const [rating, setRating] = React.useState(5);

    const handleSubmitReview = () => {
        toast({
            title: "Review Submitted!",
            description: "Thank you for your valuable feedback.",
        });
    }

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Reviews</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Add New Review
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                        <DialogDescription>Share your experience with a recent service.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                             <Label htmlFor="service-select">Completed Service</Label>
                             <Select>
                                <SelectTrigger id="service-select">
                                    <SelectValue placeholder="Select a service to review..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="booking-1">Premium Detail - Aug 28, 2024</SelectItem>
                                    <SelectItem value="booking-2">Deep House Clean - Jul 15, 2024</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Your Rating</Label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star 
                                        key={star} 
                                        className={`h-6 w-6 cursor-pointer ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                        onClick={() => setRating(star)}
                                    />
                                ))}
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="review-text">Your Review</Label>
                            <Textarea id="review-text" placeholder="Tell us what you loved..." rows={4}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="photo-upload">Upload Photo (Optional)</Label>
                            <div className="flex items-center gap-2 p-3 border-2 border-dashed rounded-lg">
                                <Camera className="h-5 w-5 text-muted-foreground"/>
                                <Input id="photo-upload" type="file" className="border-none shadow-none p-0 h-auto file:mr-2 file:text-primary file:font-semibold file:bg-primary/10 file:rounded-full file:px-3 file:py-1 file:border-none hover:file:bg-primary/20"/>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                         <DialogClose asChild>
                            <Button type="button" variant="secondary">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={handleSubmitReview}>Submit Review</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
      <div className="space-y-4">
        {pastReviews.map((review, index) => (
          <Card key={index}>
             <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{review.service}</CardTitle>
                        <CardDescription>{review.date}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                  {Array(review.rating).fill(0).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  {Array(5 - review.rating).fill(0).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-gray-300" />
                  ))}
              </div>
              <p className="text-muted-foreground">{review.review}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
