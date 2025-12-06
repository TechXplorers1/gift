import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Home, Plus } from "lucide-react";
import Link from "next/link";

export default function ComboDealsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Combined Packages</h1>
        <p className="mt-4 text-lg text-muted-foreground">The ultimate convenience and value. Get your car and home cleaned together.</p>
      </div>

      <Card className="max-w-3xl mx-auto rounded-xl shadow-xl overflow-hidden">
        <CardHeader className="text-center bg-primary text-primary-foreground p-8">
          <CardTitle className="text-3xl">The Ultimate Clean Combo</CardTitle>
          <Badge variant="destructive" className="mx-auto mt-4 text-lg bg-yellow-400 text-black hover:bg-yellow-500">Save 20%</Badge>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex justify-center items-center text-primary mb-8">
            <Car className="h-16 w-16" />
            <Plus className="h-12 w-12 mx-4" />
            <Home className="h-16 w-16" />
          </div>
          <p className="text-lg text-center text-muted-foreground mb-6">
            Experience the complete Fix Sphere Auto renewal. We'll perform our Premium Auto Detail on your vehicle and a Deep Clean for your home on the same day, giving you back a sparkling car and a serene living space. It's the perfect way to reset and refresh your two most important environments.
          </p>
          <div className="text-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/booking">Book Your Combo Deal</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
