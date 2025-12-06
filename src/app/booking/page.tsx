
"use client";

import { Suspense } from "react";
import { BookingForm } from "@/components/booking-form";
import { useSearchParams } from "next/navigation";

function BookingFormLoader() {
  const searchParams = useSearchParams();
  const service = searchParams.get('service');
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Schedule Your Service</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ready for a transformation? Book your cleaning service in just a few clicks.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <BookingForm service={service} />
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingFormLoader />
    </Suspense>
  );
}
