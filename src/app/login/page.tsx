
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { login } from "./actions";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { User, Shield, Briefcase, ArrowLeft } from "lucide-react";


export default function LoginPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedRole, setSelectedRole] = useState<'client' | 'admin' | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      if (selectedRole) {
        formData.append('role', selectedRole);
      }
      
      // Basic validation to ensure fields are not empty before submitting
      if (!formData.get('email') || !formData.get('password')) {
          alert('Please enter your email and password.');
          return;
      }
      await login(formData);
      router.refresh(); 
    }
  };
  
  const handleRoleSelect = (role: 'client' | 'admin') => {
    setSelectedRole(role);
  };
  
  const handleBack = () => {
    setSelectedRole(null);
  };
  
  if (selectedRole) {
    return (
       <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
        <Card className="w-full max-w-sm mx-auto rounded-xl shadow-xl">
           <Button variant="ghost" size="sm" onClick={handleBack} className="absolute top-4 left-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          <CardHeader className="text-center pt-12">
            <CardTitle className="text-2xl">Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</CardTitle>
            <CardDescription>Welcome back! Please enter your details.</CardDescription>
          </CardHeader>
          <form ref={formRef} onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full rounded-full">
                  Login
              </Button>
            </CardContent>
          </form>
          <CardFooter className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="underline ml-1">
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
        <Dialog open={true} onOpenChange={() => {}}>
            <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()} hideCloseButton>
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-primary">Who are you?</DialogTitle>
                    <DialogDescription className="text-center">
                        Please select your role to continue.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-3 py-4">
                    <Button variant="outline" className="w-full justify-start h-12 text-md" onClick={() => handleRoleSelect('client')}>
                        <User className="mr-3 h-5 w-5" /> Client
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-12 text-md" onClick={() => handleRoleSelect('admin')}>
                        <Shield className="mr-3 h-5 w-5" /> Admin
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-12 text-md" disabled>
                        <Briefcase className="mr-3 h-5 w-5" /> Contractor
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  );
}
