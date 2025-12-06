
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Mail, MessageSquare, Phone, Book, ArrowRight } from "lucide-react";
import Link from "next/link";

const supportActions = [
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: "Email Support",
    description: "Get a detailed response within 24 hours.",
    buttonText: "Send an Email",
    href: "mailto:hello@fixsphere.com",
    isLink: true,
  },
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    title: "Phone Support",
    description: "Speak directly with our support team.",
    buttonText: "Call (503) 555-1234",
    href: "tel:503-555-1234",
    isLink: true,
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    title: "Live Chat",
    description: "Chat with us live for immediate help.",
    buttonText: "Start Chat",
    href: "#",
    isLink: false,
    disabled: true,
  }
];

export default function SupportPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">We're here to help. Find the answers you need below.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><LifeBuoy /> Contact Us</CardTitle>
          <CardDescription>
            Choose your preferred method to get in touch with our team.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supportActions.map((action) => (
            <Card key={action.title} className="p-4 flex flex-col items-center text-center">
              {action.icon}
              <h3 className="font-semibold mt-4">{action.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4 flex-grow">{action.description}</p>
              <Button asChild={action.isLink} disabled={action.disabled} className="w-full">
                {action.isLink ? <a href={action.href}>{action.buttonText}</a> : <span>{action.buttonText}</span>}
              </Button>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Book /> Resources</CardTitle>
          <CardDescription>
            Find quick answers and manage your account settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Link href="/faq" className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div>
                    <h3 className="font-semibold">Frequently Asked Questions</h3>
                    <p className="text-sm text-muted-foreground">Find answers to common questions about our services.</p>
                </div>
                <ArrowRight className="h-5 w-5"/>
            </Link>
             <Link href="/dashboard/bookings" className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div>
                    <h3 className="font-semibold">Manage Your Bookings</h3>
                    <p className="text-sm text-muted-foreground">Reschedule, cancel, or view details of your upcoming services.</p>
                </div>
                <ArrowRight className="h-5 w-5"/>
            </Link>
             <Link href="/dashboard/settings" className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div>
                    <h3 className="font-semibold">Update Your Profile</h3>
                    <p className="text-sm text-muted-foreground">Change your contact information and password.</p>
                </div>
                <ArrowRight className="h-5 w-5"/>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
