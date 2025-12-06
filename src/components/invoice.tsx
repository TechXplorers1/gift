
import * as React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface InvoiceProps {
  data: {
    serviceType: string;
    bookingDate: Date;
    bookingTime: string;
    name: string;
    email: string;
    address: string;
    cardName?: string;
  };
  servicePrice: number;
}

export const Invoice = React.forwardRef<HTMLDivElement, InvoiceProps>(({ data, servicePrice }, ref) => {
  const taxRate = 0.08; // 8% tax
  const tax = servicePrice * taxRate;
  const total = servicePrice + tax;
  const serviceName = data.serviceType.charAt(0).toUpperCase() + data.serviceType.slice(1);
  const invoiceNumber = `INV-${new Date().getTime()}`;

  return (
    <div ref={ref} className="p-8 bg-white font-sans">
      <Card className="w-[800px] mx-auto border-none shadow-none bg-white text-black">
        <CardHeader className="p-8">
          <div className="flex justify-between items-start">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://github.com/Sapareux07/pics/blob/main/Group%201.png?raw=true" alt="Logo" style={{ width: '200px', height: 'auto' }} />
              <p className="text-sm text-gray-600 mt-2">
                123 Clean Street, Portland, OR, 97201<br />
                (503) 555-1234<br />
                hello@giftauto.com
              </p>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-gray-600">{invoiceNumber}</p>
            </div>
          </div>
          <Separator className="my-6 bg-gray-200" />
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">BILL TO</h3>
              <p className="text-gray-600">
                {data.name}<br />
                {data.address}<br />
                {data.email}
              </p>
            </div>
            <div className="text-right">
              <p><strong className="text-gray-700">Invoice Date:</strong> {format(new Date(), "PPP")}</p>
              <p><strong className="text-gray-700">Service Date:</strong> {format(data.bookingDate, "PPP")}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 font-semibold">Description</th>
                <th className="p-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-200">{serviceName} Service</td>
                <td className="p-3 border-b border-gray-200 text-right">${servicePrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end mt-6">
            <div className="w-1/2">
              <div className="flex justify-between text-gray-600">
                <p>Subtotal</p>
                <p>${servicePrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>Tax ({(taxRate * 100).toFixed(0)}%)</p>
                <p>${tax.toFixed(2)}</p>
              </div>
              <Separator className="my-2 bg-gray-200" />
              <div className="flex justify-between font-bold text-gray-800 text-lg">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-8">
          <div className="w-full">
            <h3 className="font-semibold text-gray-700 mb-2">Payment Details</h3>
            <p className="text-gray-600 text-sm">
              Paid by {data.cardName ? `Card ending in ••••` : 'PayPal'}<br />
              Thank you for your business! We appreciate the opportunity to serve you.
            </p>
            <div className="text-center mt-8 text-xs text-gray-500">
              <p>Gift Auto Mobile Detailing & House Cleaning</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
});

Invoice.displayName = "Invoice";
