
"use client";

import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { 
  Bell, 
  CreditCard,
  Gift,
  Heart,
  HelpCircle,
  Home,
  LogOut,
  MessageSquare,
  PanelLeft, 
  Settings, 
  ShoppingBag,
  Star,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/app/login/actions";

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: <Home className="h-5 w-5" /> },
  { href: "/dashboard/bookings", label: "My Bookings", icon: <ShoppingBag className="h-5 w-5" /> },
  { href: "/dashboard/payments", label: "Payment History", icon: <CreditCard className="h-5 w-5" /> },
  { href: "/dashboard/reviews", label: "My Reviews", icon: <Star className="h-5 w-5" /> },
  { href: "/dashboard/promotions", label: "Promotions", icon: <Gift className="h-5 w-5" /> },
  { href: "/dashboard/settings", label: "Account Settings", icon: <Settings className="h-5 w-5" /> },
  { href: "/dashboard/notifications", label: "Notifications", icon: <Bell className="h-5 w-5" /> },
  { href: "/dashboard/support", label: "Help & Support", icon: <HelpCircle className="h-5 w-5" /> },
];

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh(); 
  };

  const SidebarContentNav = () => (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Heart className="h-6 w-6 text-primary" />
          <span>Client Dashboard</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === link.href && "bg-muted text-primary"
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
         <Button onClick={handleLogout} className="w-full justify-start gap-3">
          <LogOut className="h-5 w-5"/>
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background md:flex">
          <SidebarContentNav />
      </aside>
      <div className="flex flex-col md:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6 shadow-sm">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
               <SidebarContentNav />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1" />
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                 <Link href="/dashboard/notifications" className="flex flex-col items-start">
                    <p className="font-semibold">Booking Confirmed</p>
                    <p className="text-xs text-muted-foreground">Your 'Premium Detail' is confirmed.</p>
                 </Link>
              </DropdownMenuItem>
               <DropdownMenuItem asChild>
                 <Link href="/dashboard/notifications" className="flex flex-col items-start">
                    <p className="font-semibold">Payment Received</p>
                    <p className="text-xs text-muted-foreground">Thank you for your payment of $199.00.</p>
                 </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/notifications" className="w-full justify-center">View All Notifications</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src="https://placehold.co/100x100" alt="User"/>
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/support">Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
        </main>
      </div>
    </div>
  )
}
