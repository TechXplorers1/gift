"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { run, stream } from "@genkit-ai/next/client";
import { sentimentSummarizerFlow } from "@/ai/flows/sentiment-summarizer";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Frown, Loader2, Star, MessageSquareQuote } from "lucide-react";
import type { SentimentSummarizerOutput } from "@/ai/flows/sentiment-summarizer";
import { getSentimentSummary } from "@/app/admin/actions";

const formSchema = z.object({
  reviews: z.string().min(10, "Please enter at least one review."),
});

const exampleReviews = [
  "5 stars: The best cleaning service I have ever used! My car looks brand new.",
  "4 stars: Very good job, but they were a little late.",
  "5 stars: Incredible attention to detail. Worth every penny.",
  "3 stars: It was okay. Some spots were missed on the interior.",
  "5 stars: I'm so happy with the results. The team was so friendly and professional.",
].join('\n');

export function SentimentAnalyzer() {
  const [summary, setSummary] = useState<SentimentSummarizerOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reviews: exampleReviews,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSummary(null);

    const reviewsArray = values.reviews.split("\n").filter(r => r.trim() !== "");
    
    try {
      const result = await getSentimentSummary({ reviews: reviewsArray });
      setSummary(result);
    } catch (err) {
      setError("An error occurred while analyzing sentiment. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="rounded-xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl">Sentiment Summarizer</CardTitle>
        <CardDescription>
          Paste customer reviews (one per line) to get an AI-powered summary and analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="reviews"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Reviews</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter reviews here, one per line..."
                      className="resize-y min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg" className="w-full rounded-full">
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Analyze Sentiment"}
            </Button>
          </form>
        </Form>

        {isLoading && (
          <div className="mt-8 space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-32 w-full" />
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-8">
            <Frown className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {summary && (
          <div className="mt-8 space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-center">Analysis Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">5-Star Ratings</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{summary.fiveStarCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{summary.averageScore.toFixed(2)} / 5</div>
                </CardContent>
              </Card>
            </div>
            <Card>
                <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Overall Summary</CardTitle>
                    <MessageSquareQuote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{summary.summary}</p>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
