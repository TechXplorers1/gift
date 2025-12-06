
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, Users, Award } from "lucide-react";

const teamMembers = [
  { name: "Grace Founder", role: "Founder & Lead Detailer", imageUrl: "https://picsum.photos/seed/401/400/400" },
  { name: "John Sparkle", role: "House Cleaning Supervisor", imageUrl: "https://picsum.photos/seed/402/400/400" },
  { name: "Emily Shine", role: "Customer Relations", imageUrl: "https://picsum.photos/seed/403/400/400" },
];

export default function AboutUsPage() {
  return (
    <div className="bg-background">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">About Fix Sphere</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Learn about our journey, our values, and the people who make our service a gift.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://picsum.photos/seed/400/600/400"
                alt="Founder smiling"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="smiling person"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Founder's Story</h2>
              <p className="text-muted-foreground mb-4">
                Gift was born from a simple yet powerful idea: to turn the mundane task of cleaning into a meaningful act of service. Our founder, Grace, discovered that a clean car or a spotless home wasn't just about aesthetics—it was about providing a sense of peace, clarity, and renewal to others.
              </p>
              <p className="text-muted-foreground">
                Driven by a deep-seated Christian faith, the mission became clear: to offer a service that feels like a gift, delivered with kindness, integrity, and a commitment to grace. Every client is treated like family, and every job is an opportunity to make someone's day a little brighter.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="border-0 shadow-none">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full"><HeartHandshake className="h-8 w-8 text-primary"/></div>
                <CardTitle className="mt-4">Service with Grace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We approach every task with a servant's heart, aiming to bless our clients through our work.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full"><Award className="h-8 w-8 text-primary"/></div>
                <CardTitle className="mt-4">Uncompromising Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We use the best products and techniques to deliver a pristine, lasting clean every time.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full"><Users className="h-8 w-8 text-primary"/></div>
                <CardTitle className="mt-4">Community Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We're dedicated to being a positive force in our community, offering support and partnership.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Meet the Team</h2>
            <p className="mt-4 text-lg text-muted-foreground">The friendly faces behind our five-star service.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center p-6 rounded-lg">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                  <AvatarImage src={member.imageUrl} alt={member.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Community Outreach</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We believe in giving back. A portion of our proceeds supports local charities and community projects. We're proud to partner with organizations that share our mission of hope and renewal in Portland and the surrounding areas.
          </p>
        </div>
      </section>
    </div>
  );
}
