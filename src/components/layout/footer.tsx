import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const socialLinks = [
    { icon: <Facebook />, href: "#" },
    { icon: <Instagram />, href: "#" },
    { icon: <Twitter />, href: "#" },
  ];

  const footerLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services/auto-detailing" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image src="https://github.com/Sapareux07/pics/blob/main/Group%201.png?raw=true" alt="Logo" width={160} height={40} className="h-auto w-auto" />
            </Link>
            <p className="mt-2 text-muted-foreground">Auto Mobile Detailing & House Cleaning.</p>
          </div>
          <div className="grid grid-cols-2 md:col-span-3 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <Button key={index} asChild variant="ghost" size="icon">
                    <a href={link.href} aria-label={`Follow us on ${link.href}`} className="text-muted-foreground hover:text-primary">
                      {link.icon}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Gift Auto Mobile Detailing & House Cleaning. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
