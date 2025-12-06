
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car, Home as HomeIcon, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollAnimation } from "@/components/scroll-animation";

const services = [
  {
    icon: <Car className="h-12 w-12 text-primary" />,
    title: "Auto Detailing",
    description: "Impeccable detailing to restore your vehicle's showroom shine, inside and out.",
    link: "/services/auto-detailing",
  },
  {
    icon: <HomeIcon className="h-12 w-12 text-primary" />,
    title: "House Cleaning",
    description: "Deep cleaning services that leave your home sparkling, sanitized, and serene.",
    link: "/services/house-cleaning",
  },
  {
    icon: <Image src="https://github.com/Sapareux07/pics/blob/main/ChatGPT%20Image%20Aug%202,%202025,%2004_44_18%20PM.png?raw=true" alt="Combo Deal" width={48} height={48} className="h-12 w-12 text-primary" />,
    title: "Combo Deal",
    description: "The ultimate clean for your car and home. Book together and save 20%!",
    link: "/services/combo-deals",
  },
];

const howItWorksSteps = [
  {
    step: 1,
    title: "Book Online",
    description: "Select your service and choose a date and time that works for you.",
  },
  {
    step: 2,
    title: "We Arrive",
    description: "Our professional team arrives on time with all the necessary equipment.",
  },
  {
    step: 3,
    title: "You Relax",
    description: "Sit back and enjoy your free time while we bring the sparkle back.",
  },
];

const testimonials = [
  {
    name: "Jennifer M.",
    photoUrl: "https://picsum.photos/seed/101/100/100",
    review: "Absolutely blessed by their service! My car has never looked better, and the attention to detail was incredible. It truly felt like a gift.",
    rating: 5,
  },
  {
    name: "Michael R.",
    photoUrl: "https://picsum.photos/seed/102/100/100",
    review: "The house cleaning was phenomenal. They were kind, respectful, and left our home feeling so fresh and renewed. Highly recommend!",
    rating: 5,
  },
  {
    name: "David & Susan P.",
    photoUrl: "https://picsum.photos/seed/103/100/100",
    review: "We got the combo deal, and it was worth every penny. Professional, thorough, and all done with such a positive spirit. We'll be returning customers!",
    rating: 5,
  },
  {
    name: "Emily T.",
    photoUrl: "https://picsum.photos/seed/104/100/100",
    review: "Great job on my SUV. It was a mess after a road trip with the kids. They got it looking almost new. A bit pricey but the quality is there.",
    rating: 4,
  },
  {
    name: "Robert G.",
    photoUrl: "https://picsum.photos/seed/105/100/100",
    review: "I scheduled a deep clean before my parents visited and I was blown away. They didn't miss a single spot. Very trustworthy and professional crew.",
    rating: 5,
  },
  {
    name: "Maria C.",
    photoUrl: "https://picsum.photos/seed/106/100/100",
    review: "The interior detailing is magical. All the coffee stains and kid messes are gone. The car smells amazing. Thank you, Grace!",
    rating: 5,
  },
  {
    name: "Kevin H.",
    photoUrl: "https://picsum.photos/seed/107/100/100",
    review: "They are so accommodating with scheduling. I book them for regular house cleaning and my home has never been more consistently tidy. A true blessing.",
    rating: 5,
  },
  {
    name: "Jessica L.",
    photoUrl: "https://picsum.photos/seed/108/100/100",
    review: "My car's paint was dull and swirled. The paint correction service worked wonders. It looks better than when I bought it!",
    rating: 5,
  },
  {
    name: "The Miller Family",
    photoUrl: "https://picsum.photos/seed/109/100/100",
    review: "We used them for a move-out clean and got our full deposit back. The place was spotless. Cannot thank them enough for their hard work.",
    rating: 5,
  },
  {
    name: "Daniel B.",
    photoUrl: "https://picsum.photos/seed/110/100/100",
    review: "A fantastic, reliable service with a heart for what they do. You can tell they care about their clients and their work. Truly a 'gift'!",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] min-h-[500px] w-full">
        <Image
          src="https://github.com/Sapareux07/pics/blob/main/ChatGPT%20Image%20Aug%202,%202025,%2005_48_11%20PM.png?raw=true"
          alt="Car and home cleaning in progress"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="car detailing house cleaning"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold !font-headline text-shadow-lg leading-tight animate-fade-in-down">
            A Gift of Clean – Renewed by Grace
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl animate-fade-in-up">
            Experience a level of clean for your car and home that feels like a blessing.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full animate-fade-in">
              <Link href="/booking">Book Now</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full animate-fade-in">
              <Link href="/services/auto-detailing">View Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="text-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl rounded-xl hover:border-primary">
                  <CardHeader className="items-center">
                    {service.icon}
                    <CardTitle className="text-2xl pt-4">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                    <Button asChild variant="link" className="mt-4 text-primary">
                      <Link href={service.link}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission &amp; Faith</h2>
            <blockquote className="mt-6 text-xl italic text-muted-foreground border-l-4 border-primary pl-6">
              "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!"
              <cite className="block not-italic mt-2 text-base">- 2 Corinthians 5:17</cite>
            </blockquote>
            <p className="mt-6 text-lg">
              We believe in service that renews, restores, and uplifts. Our work is driven by faith, a commitment to kindness, and a passion for creating clean, peaceful environments for our clients. Each job is an opportunity to serve with grace and deliver a result that feels like a gift.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {howItWorksSteps.map((step) => (
                <div key={step.step} className="flex flex-col items-center z-10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl border-4 border-background mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">What Our Clients Say</h2>
          </ScrollAnimation>
          <div
            className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)]"
          >
            <div className="flex w-max animate-scroll-slow hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="w-[350px] flex-shrink-0 px-4">
                  <Card className="h-full flex flex-col justify-between rounded-xl shadow-md">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Avatar className="w-20 h-20 mb-4 border-2 border-primary">
                        <AvatarImage src={testimonial.photoUrl} alt={testimonial.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center mb-2">
                        {Array(testimonial.rating).fill(0).map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic">"{testimonial.review}"</p>
                    </CardContent>
                    <CardHeader className="pt-0 items-center text-center">
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold">Ready for a clean that feels like a blessing?</h2>
            <p className="mt-2 text-lg">Let’s get started.</p>
            <Button asChild size="lg" variant="secondary" className="mt-6 rounded-full">
              <Link href="/booking">Schedule Your Service</Link>
            </Button>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
