
"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const testimonials = [
  { name: "Sarah L.", photoUrl: "https://picsum.photos/seed/201/100/100", service: "House Cleaning", rating: 5, review: "Absolutely blessed by their service! My car has never looked better, and the attention to detail was incredible. It truly felt like a gift." },
  { name: "Michael R.", photoUrl: "https://picsum.photos/seed/202/100/100", service: "Auto Detailing", rating: 5, review: "The house cleaning was phenomenal. They were kind, respectful, and left our home feeling so fresh and renewed. Highly recommend!" },
  { name: "David & Susan P.", photoUrl: "https://picsum.photos/seed/203/100/100", service: "Combo Deal", rating: 5, review: "We got the combo deal, and it was worth every penny. Professional, thorough, and all done with such a positive spirit. We'll be returning customers for sure!" },
  { name: "Emily T.", photoUrl: "https://picsum.photos/seed/204/100/100", service: "Auto Detailing", rating: 4, review: "Great job on my SUV. It was a mess after a road trip with the kids. They got it looking almost new. A bit pricey but the quality is there." },
  { name: "Robert G.", photoUrl: "https://picsum.photos/seed/205/100/100", service: "House Cleaning", rating: 5, review: "I scheduled a deep clean before my parents visited and I was blown away. They didn't miss a single spot. Very trustworthy and professional crew." },
  { name: "Maria C.", photoUrl: "https://picsum.photos/seed/206/100/100", service: "Auto Detailing", rating: 5, review: "The interior detailing is magical. All the coffee stains and kid messes are gone. The car smells amazing. Thank you, Grace!" },
];

const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  service: z.string().min(1, "Please select a service."),
  rating: z.coerce.number().min(1).max(5),
  review: z.string().min(10, "Review must be at least 10 characters.").max(500),
});

export default function TestimonialsPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: "", service: "", rating: 5, review: "" },
  });

  function onSubmit(values: z.infer<typeof reviewSchema>) {
    console.log(values);
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback. We appreciate you!",
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Words from Our Community</h1>
        <p className="mt-4 text-lg text-muted-foreground">See why our clients feel blessed by our service.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="flex flex-col rounded-xl shadow-lg">
            <CardHeader className="flex-row gap-4 items-center">
              <Avatar className="w-16 h-16 border-2 border-primary">
                <AvatarImage src={testimonial.photoUrl} alt={testimonial.name} data-ai-hint="person portrait" />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{testimonial.name}</CardTitle>
                <CardDescription>{testimonial.service}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center mb-2">
                {Array(testimonial.rating).fill(0).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
                {Array(5 - testimonial.rating).fill(0).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gray-300" />
                ))}
              </div>
              <p className="text-muted-foreground italic">"{testimonial.review}"</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-card p-8 md:p-12 rounded-xl shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Share Your Experience</h2>
          <p className="mt-2 text-muted-foreground">Help others discover the Gift difference.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Received</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
  <SelectValue placeholder="Select a service" />
</SelectTrigger> {/* ✅ Fixed */}
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="auto">Auto Detailing</SelectItem>
                        <SelectItem value="house">House Cleaning</SelectItem>
                        <SelectItem value="combo">Combo Deal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Rating</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                      <FormControl>
                       <SelectTrigger>
  <SelectValue placeholder="Select a rating" />
</SelectTrigger> {/* ✅ Fixed */}
                      </FormControl>
                      <SelectContent>
                        {[5, 4, 3, 2, 1].map(r => 
                          <SelectItem key={r} value={String(r)}>{r} Star{r > 1 ? 's' : ''}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about your experience..." className="resize-none" rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
              <Button type="submit" size="lg" className="rounded-full">Submit Review</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
