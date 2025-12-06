
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';
import { 
  Bell, 
  BookOpen, 
  Home, 
  LineChart, 
  Package, 
  PanelLeft, 
  Plus, 
  Settings, 
  ShoppingCart, 
  Star,
  Tag,
  Users2,
  Wallet,
  FileText,
  CreditCard
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { logout } from "@/app/login/actions";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: <Home className="h-4 w-4" /> },
  { href: "/admin/bookings", label: "Bookings", icon: <ShoppingCart className="h-4 w-4" /> },
  { href: "/admin/customers", label: "Customers", icon: <Users2 className="h-4 w-4" /> },
  { href: "/admin/staff", label: "Staff", icon: <Users2 className="h-4 w-4" /> },
  { href: "/admin/services", label: "Services", icon: <Package className="h-4 w-4" /> },
  { href: "/admin/payments", label: "Payments", icon: <CreditCard className="h-4 w-4" /> },
  { href: "/admin/reviews", label: "Reviews", icon: <Star className="h-4 w-4" /> },
  { href: "/admin/content", label: "Content", icon: <FileText className="h-4 w-4" /> },
  { href: "/admin/reports", label: "Reports", icon: <LineChart className="h-4 w-4" /> },
  { href: "/admin/notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
  { href: "/admin/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
];

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}


export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh(); 
  };

  return (
    <ClientOnly>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
          <div className="flex h-16 shrink-0 items-center border-b px-6">
            <Link href="/">
                <Image src="https://github.com/Sapareux07/pics/blob/main/Group%201.png?raw=true" alt="Logo" width={120} height={30} className="h-auto w-auto" />
            </Link>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <ul className="grid items-start px-4 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      pathname === link.href && "bg-muted text-primary"
                    )}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="flex flex-col sm:pl-60">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 shadow-sm sm:h-16 sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link href="/" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                    <Image src="https://github.com/Sapareux07/pics/blob/main/Group%201.png?raw=true" alt="Logo" width={100} height={25} />
                    <span className="sr-only">FIX SPHERE</span>
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                        pathname === link.href && "text-foreground"
                      )}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="relative ml-auto flex-1 md:grow-0" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <p className="font-semibold">New Booking!</p>
                    <p className="text-xs text-muted-foreground">John D. booked a Premium Detail.</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <p className="font-semibold">Payment Received</p>
                    <p className="text-xs text-muted-foreground">$199 from Jane S.</p>
                  </div>
                </DropdownMenuItem>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                    <Link href="/admin/notifications" className="flex items-center justify-center">
                      View All Notifications
                    </Link>
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                  <Avatar>
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </ClientOnly>
  );
}
