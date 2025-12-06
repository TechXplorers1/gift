
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Gift, Copy, UserPlus, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const promotions = [
  { code: "WELCOME15", description: "15% off your next Auto Detailing service.", type: "Coupon" },
  { code: "FRIEND50", description: "$50 credit for you and a friend when they book their first service.", type: "Referral" },
];

export default function PromotionsPage() {
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard!",
      description: `Code "${text}" has been copied.`,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Promotions &amp; Loyalty</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Star className="text-yellow-400 fill-yellow-400"/> Your Loyalty Status</CardTitle>
          <CardDescription>Track your progress toward exclusive rewards.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <div className="flex justify-between mb-1 text-sm font-medium">
                    <span>Gold Member</span>
                    <span>1,250 / 2,000 Points</span>
                </div>
                <Progress value={62.5} />
                <p className="text-sm text-muted-foreground mt-2 text-center">You're 750 points away from Platinum status!</p>
            </div>
             <div className="text-center p-4 bg-muted rounded-lg">
                <p className="font-semibold">Next Reward Unlocked</p>
                <p className="text-muted-foreground">Free Basic Wash at 1,500 points.</p>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Gift/> Active Coupons &amp; Offers</CardTitle>
          <CardDescription>Use these codes at checkout to apply your discounts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {promotions.map((promo, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-4 border rounded-lg">
              <div>
                <p className="font-mono font-bold text-primary">{promo.code}</p>
                <p className="text-sm text-muted-foreground">{promo.description}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleCopy(promo.code)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Code
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserPlus /> Invite Friends, Get Rewarded</CardTitle>
          <CardDescription>Share your unique referral link and earn credits.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
                <Input readOnly value="https://giftauto.com/signup?ref=USER123" />
                <Button onClick={() => handleCopy("https://giftauto.com/signup?ref=USER123")} className="w-full sm:w-auto">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                </Button>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
