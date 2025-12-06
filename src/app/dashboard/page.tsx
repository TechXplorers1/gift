
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Edit } from "lucide-react"
import Link from "next/link"

export default function DashboardOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src="https://placehold.co/100x100" alt="User Name" data-ai-hint="person portrait" />
                <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-2xl font-bold">Welcome Back, User!</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary">Loyalty Level: Gold</Badge>
                    <span>|</span>
                    <span>1,250 Points</span>
                </div>
            </div>
             <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/settings"><Edit className="mr-2 h-4 w-4"/> Edit Profile</Link>
                </Button>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Next Upcoming Booking</CardTitle>
                <CardDescription>Your next scheduled service is just around the corner.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-4">
                    <Calendar className="h-8 w-8 text-primary"/>
                    <div>
                        <p className="font-semibold">Date</p>
                        <p className="text-muted-foreground">August 28, 2024</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Clock className="h-8 w-8 text-primary"/>
                    <div>
                        <p className="font-semibold">Time</p>
                        <p className="text-muted-foreground">10:00 AM</p>
                    </div>
                </div>
                 <div>
                    <p className="font-semibold mb-1">Service Type</p>
                    <Badge>Premium Detail</Badge>
                </div>
                 <div>
                    <p className="font-semibold mb-1">Status</p>
                    <Badge variant="default">Confirmed</Badge>
                </div>
            </CardContent>
            <CardFooter>
                 <Button asChild>
                    <Link href="/dashboard/bookings">View All Bookings</Link>
                 </Button>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Your Loyalty Progress</CardTitle>
                <CardDescription>You're almost at your next reward!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Progress value={60} />
                    <p className="text-sm text-muted-foreground text-center">3 more bookings to unlock 15% off!</p>
                </div>
            </CardContent>
             <CardFooter>
                 <Button asChild>
                    <Link href="/dashboard/promotions">View Promotions</Link>
                 </Button>
            </CardFooter>
        </Card>
    </div>
  )
}
