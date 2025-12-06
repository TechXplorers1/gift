
"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle, CreditCard, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Invoice } from "./invoice";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const baseBookingSchema = z.object({
  serviceType: z.string({ required_error: "Please select a service." }),
  bookingDate: z.date({ required_error: "A date is required." }),
  bookingTime: z.string({ required_error: "A time is required." }),
  name: z.string().min(2, "Name is too short."),
  email: z.string().email(),
  phone: z.string().min(10, "Please enter a valid phone number."),
  address: z.string().min(5, "Please enter a valid address."),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCVC: z.string().optional(),
});

const refinedBookingSchema = baseBookingSchema.superRefine((data, ctx) => {
    // This is a placeholder for conditional validation based on payment method in a real app.
    // For this implementation, the validation happens in the `onSubmit` logic.
});

type BookingFormValues = z.infer<typeof baseBookingSchema>;

const timeSlots = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"];

const servicePrices: Record<string, number> = {
  auto: 199,
  house: 189,
  combo: 350,
};

export function BookingForm({ service }: { service: string | null }) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | null>(null);
  const [bookingData, setBookingData] = useState<BookingFormValues | null>(null);
  const { toast } = useToast();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(refinedBookingSchema),
    defaultValues: {
        serviceType: service || "",
        name: "",
        email: "",
        phone: "",
        address: "",
        bookingTime: "",
        cardName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCVC: "",
    }
  });

  const { formState, trigger, getValues, setValue } = form;

  useEffect(() => {
    if (service) {
      setValue("serviceType", service);
    }
  }, [service, setValue]);


  const nextStep = async () => {
    let fieldsToValidate: (keyof BookingFormValues)[] = [];
    if (step === 1) {
      fieldsToValidate = ["serviceType", "bookingDate", "bookingTime"];
    } else if (step === 2) {
      fieldsToValidate = ["name", "email", "phone", "address"];
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  async function onSubmit(data: BookingFormValues) {
    if (step === 4) {
      if (!paymentMethod) {
        toast({
            title: "Payment Method Required",
            description: "Please select a payment method.",
            variant: "destructive"
        });
        return;
      }
      if (paymentMethod === 'card') {
        const cardFieldsValid = await trigger(["cardName", "cardNumber", "cardExpiry", "cardCVC"]);
        if (!cardFieldsValid) {
          toast({
            title: "Invalid Card Details",
            description: "Please fill in all required card information.",
            variant: "destructive",
          });
          return;
        }
      }
      // If paypal, we'd redirect here in a real app.
      // For now, we just proceed.
    }
    
    console.log("Booking submitted:", data);
    setBookingData(data);
    setStep(5); // Move to confirmation page
  }
  
  // We need to update the Zod schema for payment step validation
  const paymentSchema = baseBookingSchema.extend({
      cardName: z.string().min(2, "Name on card is required."),
      cardNumber: z.string().regex(/^(?:\d{4} ?){4}$/, "Please enter a valid 16-digit card number."),
      cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Please use MM/YY format."),
      cardCVC: z.string().regex(/^\d{3,4}$/, "Please enter a valid CVC."),
  });

  const formWithPayment = useForm<BookingFormValues>({
    resolver: zodResolver(paymentMethod === 'card' ? paymentSchema : refinedBookingSchema),
    defaultValues: form.getValues()
  });

  // Keep forms in sync
  useEffect(() => {
    const subscription = form.watch((value) => {
      for (const key in value) {
        formWithPayment.setValue(key as keyof BookingFormValues, value[key as keyof BookingFormValues]);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, formWithPayment]);

  const handleDownloadInvoice = async () => {
    const invoiceElement = invoiceRef.current;
    if (!invoiceElement) return;

    const canvas = await html2canvas(invoiceElement, {
      scale: 2,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'px', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${bookingData?.name?.split(' ').join('-') || 'download'}.pdf`);
  };

  return (
    <Card className="rounded-xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl">
          {step === 1 && "1. Select Service & Time"}
          {step === 2 && "2. Your Details"}
          {step === 3 && "3. Confirm Booking"}
          {step === 4 && "4. Payment"}
          {step === 5 && "Booking Confirmed!"}
        </CardTitle>
        <CardDescription>
          {step === 5 ? "We've sent a confirmation to your email." : "Follow the steps to complete your booking."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...(paymentMethod === 'card' ? formWithPayment : form)}>
          <form onSubmit={(paymentMethod === 'card' ? formWithPayment : form).handleSubmit(onSubmit)} className="space-y-8">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="auto">Auto Detailing</SelectItem>
                          <SelectItem value="house">House Cleaning</SelectItem>
                          <SelectItem value="combo">Combined Package</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="bookingDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} initialFocus />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bookingTime"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Available Time Slots</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select a time" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {timeSlots.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <FormField name="name" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="email" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="phone" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="(555) 555-5555" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="address" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Service Address</FormLabel><FormControl><Input placeholder="123 Main St, Portland, OR" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-lg font-semibold">Booking Summary</h3>
                <div className="p-4 border rounded-md bg-muted/50 space-y-2">
                  <p><strong>Service:</strong> {getValues("serviceType")}</p>
                  <p><strong>Date:</strong> {getValues("bookingDate") ? format(getValues("bookingDate"), "PPP") : 'N/A'} at {getValues("bookingTime")}</p>
                  <p><strong>Name:</strong> {getValues("name")}</p>
                  <p><strong>Email:</strong> {getValues("email")}</p>
                  <p><strong>Address:</strong> {getValues("address")}</p>
                </div>
                <p className="text-sm text-muted-foreground">By clicking "Proceed to Payment", you agree to our terms of service.</p>
              </div>
            )}
            
            {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4">
                        <Button type="button" variant={paymentMethod === 'card' ? 'default' : 'outline'} onClick={() => setPaymentMethod('card')}>
                            <CreditCard className="mr-2 h-4 w-4" /> Pay with Card
                        </Button>
                        <Button type="button" variant={paymentMethod === 'paypal' ? 'default' : 'outline'} onClick={() => setPaymentMethod('paypal')}>
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7.343 3.407a1 1 0 00-.785.378L2.003 10.35a1 1 0 00-.17.632l-1.07 7.494a1 1 0 00.999 1.121h5.056a1 1 0 00.98-.804l.54-3.784a1 1 0 01.98-.804h2.468a1 1 0 00.98-.804l.82-5.742a1 1 0 00-.98-.1.972l-3.32.83a1 1 0 01-1.226-.74l-.99-6.931zm10.354 5.253a1 1 0 00-.98.804l-.82 5.742a1 1 0 00.98.1.972l3.32-.83a1 1 0 00.785-1.18l-1.07-7.494a1 1 0 00-.999-1.121h-5.056a1 1 0 00-.98.804l-.54 3.784a1 1 0 01-.98.804H9.434a1 1 0 00-.98.804l-.16.1.82-5.742a1 1 0 01.98-.804h5.742a1 1 0 01.98.804z" />
                            </svg>
                             PayPal
                        </Button>
                    </div>

                    {paymentMethod === 'card' && (
                        <div className="space-y-4 border p-4 rounded-md">
                            <FormField name="cardName" control={formWithPayment.control} render={({ field }) => (
                                <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField name="cardNumber" control={formWithPayment.control} render={({ field }) => (
                                <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField name="cardExpiry" control={formWithPayment.control} render={({ field }) => (
                                    <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField name="cardCVC" control={formWithPayment.control} render={({ field }) => (
                                    <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>
                        </div>
                    )}
                    {paymentMethod === 'paypal' && (
                        <div className="text-center p-8 border rounded-md">
                            <p className="text-muted-foreground">You will be redirected to PayPal to complete your payment.</p>
                        </div>
                    )}
                </div>
            )}

            {step === 5 && (
                <div className="text-center py-8 animate-fade-in">
                    <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Thank You!</h3>
                    <p className="text-muted-foreground mt-2">Your booking is complete. We look forward to serving you!</p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="rounded-full" onClick={() => { form.reset(); formWithPayment.reset(); setStep(1); }}>
                            <a href="/">Back to Home</a>
                        </Button>
                        <Button type="button" variant="outline" className="rounded-full" onClick={handleDownloadInvoice}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Invoice
                        </Button>
                    </div>
                    <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                        {bookingData && <Invoice ref={invoiceRef} data={bookingData} servicePrice={servicePrices[bookingData.serviceType] || 0} />}
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center pt-4">
              {step > 1 && step < 5 && <Button type="button" variant="outline" onClick={prevStep} className="rounded-full">Go Back</Button>}
              <div />
              {step < 3 && <Button type="button" onClick={nextStep} className="rounded-full">Next Step</Button>}
              {step === 3 && <Button type="button" onClick={() => setStep(4)} className="rounded-full">Proceed to Payment</Button>}
              {step === 4 && <Button type="submit" className="rounded-full">Confirm Booking</Button>}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
