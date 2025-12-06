
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { logout } from "@/app/login/actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "../theme-toggle";


const navLinks = [
  { 
    name: "Services", 
    href: "#",
    dropdown: [
      { name: "Auto Detailing", href: "/services/auto-detailing" },
      { name: "House Cleaning", href: "/services/house-cleaning" },
      { name: "Combined Packages", href: "/services/combo-deals" },
    ]
  },
  { name: "Gallery", href: "/gallery" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // This is a simple way to check for a cookie on the client side.
    // In a real app, you'd manage this as part of a proper auth context.
    const loggedIn = document.cookie.includes('isLoggedIn=true');
    setIsLoggedIn(loggedIn);
  }, [pathname]); // Rerun on path change to update login status

  const handleLogout = async () => {
    await logout();
    router.refresh(); // Force a refresh to re-check auth state and redirect
  };

  const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <Link
      href={href}
      className={cn("text-sm font-medium transition-colors hover:text-primary", className)}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {children}
    </Link>
  );
  
  const renderNavLinks = (isMobile = false) => (
    navLinks.map((link) => (
      link.dropdown ? (
        <DropdownMenu key={link.name}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={cn("text-sm font-medium hover:text-primary px-0 sm:px-3", isMobile && "w-full justify-start py-2 text-lg")}>
              {link.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {link.dropdown.map((item) => (
              <DropdownMenuItem key={item.name} asChild>
                <Link href={item.href}>{item.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <NavLink key={link.name} href={link.href} className={isMobile ? "py-2 text-lg" : ""}>
          {link.name}
        </NavLink>
      )
    ))
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center" style={{ flex: '1 0 0' }}>
          <Link href="/" className="flex items-center">
            <Image src="https://github.com/Sapareux07/pics/blob/main/Group%201.png?raw=true" alt="Logo" width={160} height={40} className="h-auto w-auto" />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center justify-center gap-6 text-sm">
          {renderNavLinks()}
        </nav>

        <div className="flex items-center justify-end gap-2" style={{ flex: '1 0 0' }}>
          <ThemeToggle />
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">My Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin">Admin</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" className="hidden sm:inline-flex rounded-full">
              <Link href="/login">Login</Link>
            </Button>
          )}

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                     <Image src="https://github.com/Sapareux07/pics/blob/main/Group%201.png?raw=true" alt="Logo" width={160} height={40} className="h-auto w-auto" />
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col items-start gap-4">
                  {renderNavLinks(true)}
                </nav>
                <div className="mt-auto flex flex-col gap-2">
                  {!isLoggedIn && (
                    <Button asChild variant="outline" className="rounded-full w-full" onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/login">Login</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
