
import Image from "next/image";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";

const contactDetails = [
  { icon: <Phone className="h-6 w-6 text-primary" />, title: "Phone", value: "(503) 555-1234" },
  { icon: <Mail className="h-6 w-6 text-primary" />, title: "Email", value: "hello@fixsphere.com" },
  { icon: <Clock className="h-6 w-6 text-primary" />, title: "Hours", value: "Mon - Sat, 8am - 6pm" },
  { icon: <MapPin className="h-6 w-6 text-primary" />, title: "Service Area", value: "Portland, OR & 50-mile radius" },
];

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
          <p className="mt-4 text-lg text-muted-foreground">We'd love to hear from you. Let's make your space shine.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-card p-8 md:p-12 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <p className="text-muted-foreground mb-4">
              Have a question or want to get a custom quote? Fill out the form and we'll respond within 24 hours.
            </p>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <Card className="rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactDetails.map(detail => (
                  <div key={detail.title} className="flex items-start gap-4">
                    {detail.icon}
                    <div>
                      <h3 className="font-semibold">{detail.title}</h3>
                      <p className="text-muted-foreground">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-lg overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-2xl">Our Service Area</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video relative">
                        <Image 
                            src="https://github.com/Sapareux07/Auto_Assist/blob/main/map.png?raw=true" 
                            alt="Map of Portland service area" 
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                            data-ai-hint="map Portland Oregon"
                        />
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
