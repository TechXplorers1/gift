import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShieldCheck } from "lucide-react";
import Link from "next/link";

const services = [
  {
    name: "Deep Clean",
    price: 189,
    features: ["Top-to-bottom cleaning", "Kitchen & Bathroom sanitization", "Baseboards & moldings", "Ideal for first-time or seasonal cleaning"],
  },
  {
    name: "Move-In/Out Clean",
    price: 249,
    features: ["Empty home deep clean", "Inside cabinets & drawers", "Inside oven & refrigerator", "Ensures a fresh start"],
  },
  {
    name: "Regular Maintenance",
    price: 89,
    features: ["Weekly, bi-weekly, or monthly", "Keeps your home consistently clean", "Customizable checklist", "Flexible scheduling"],
  }
];

export default function HouseCleaningPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">House Cleaning Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">Enjoy a sparkling, serene home with our professional cleaning plans.</p>
      </div>
      
      <div className="text-center mb-12">
        <div className="inline-flex items-center bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full">
          <ShieldCheck className="h-5 w-5 mr-2" />
          We use Eco-Friendly &amp; Pet-Safe Products!
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map(service => (
          <Card key={service.name} className="flex flex-col rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{service.name}</CardTitle>
              <CardDescription>Starting at</CardDescription>
              <p><span className="text-4xl font-bold">${service.price}</span></p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full">
                <Link href="/booking">Book This</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card className="mt-12 text-center p-8 rounded-xl shadow-lg bg-primary/10">
        <CardTitle className="text-2xl">Need a Custom Plan?</CardTitle>
        <CardDescription className="mt-2 mb-4">Every home is unique. Contact us for a personalized quote.</CardDescription>
        <Button asChild className="rounded-full">
          <Link href="/contact">Request a Quote</Link>
        </Button>
      </Card>
    </div>
  );
}
