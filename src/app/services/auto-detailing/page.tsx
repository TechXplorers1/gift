import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const services = [
  {
    name: "Basic Wash",
    price: 99,
    features: ["Exterior Hand Wash & Dry", "Wheel & Tire Cleaning", "Interior Vacuum", "Window Cleaning"],
  },
  {
    name: "Premium Detail",
    price: 199,
    features: ["All Basic features", "Clay Bar Treatment", "Wax Application", "Deep Interior Cleaning & Conditioning", "Tire Dressing"],
  },
  {
    name: "Paint Correction",
    price: 299,
    features: ["All Premium features", "Multi-stage Paint Correction", "Scratch & Swirl Removal", "Ceramic Sealant"],
  }
];

export default function AutoDetailingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Auto Detailing Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">Restore your vehicle's brilliance with our expert detailing packages.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map(service => (
          <Card key={service.name} className="flex flex-col rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">{service.name}</CardTitle>
              <CardDescription>Starting from</CardDescription>
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
    </div>
  );
}
