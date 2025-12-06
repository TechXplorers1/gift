
"use client";

import Image from "next/image";
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const galleryImages = [
  { type: "auto", before: "https://github.com/Sapareux07/gift/blob/main/auto%201.png?raw=true", after: "https://github.com/Sapareux07/gift/blob/main/auto%202..png?raw=true", id: 1, hint: "dirty car clean car" },
  { type: "home", before: "https://github.com/Sapareux07/gift/blob/main/home%201.png?raw=true", after: "https://github.com/Sapareux07/gift/blob/main/home%202.png?raw=true", id: 2, hint: "messy room clean room" },
  { type: "combo", before: "https://github.com/Sapareux07/Auto_Assist/blob/main/combo%203.png?raw=true", after: "https://github.com/Sapareux07/Auto_Assist/blob/main/combo%203.1.png?raw=true", id: 3, hint: "dirty car clean livingroom" },
  { type: "auto", before: "https://github.com/Sapareux07/gift/blob/main/auto%201.1.png?raw=true", after: "https://github.com/Sapareux07/gift/blob/main/auto%202.1.png?raw=true", id: 4, hint: "muddy car interior clean interior" },
  { type: "home", before: "https://github.com/Sapareux07/gift/blob/main/home%201.1.png?raw=true", after: "https://github.com/Sapareux07/gift/blob/main/home%202.1.png?raw=true", id: 5, hint: "dirty kitchen clean kitchen" },
  { type: "auto", before: "https://github.com/Sapareux07/gift/blob/main/auto%201.2.png?raw=true", after: "https://github.com/Sapareux07/gift/blob/main/auto%202.2.png?raw=true", id: 6, hint: "dusty dashboard clean dashboard" },
  { type: "combo", before: "https://github.com/Sapareux07/Auto_Assist/blob/main/com.png?raw=true", after: "https://github.com/Sapareux07/Auto_Assist/blob/main/com.1.png?raw=true", id: 7, hint: "stained carpet clean car seat" },
  { type: "home", before: "https://github.com/Sapareux07/Auto_Assist/blob/main/home%202.2.png?raw=true", after: "https://github.com/Sapareux07/Auto_Assist/blob/main/home%202.3.png?raw=true", id: 8, hint: "dusty livingroom clean livingroom" },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredImages = galleryImages.filter(image => 
    activeTab === 'all' || image.type === activeTab
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Our Work in Action</h1>
        <p className="mt-4 text-lg text-muted-foreground">See the transformations we bring to cars and homes.</p>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="auto">Auto</TabsTrigger>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="combo">Combo</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredImages.map((image, index) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden cursor-pointer group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                    <CardContent className="p-0 relative">
                      <Image
                        src={image.after}
                        alt={`After ${image.type} cleaning`}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                        data-ai-hint={image.hint.split(' ')[1]}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-lg font-bold">View Transformation</p>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-center">Before</h3>
                      <Image
                        src={image.before}
                        alt={`Before ${image.type} cleaning`}
                        width={600}
                        height={400}
                        className="rounded-md w-full h-auto object-cover"
                        data-ai-hint={image.hint.split(' ')[0]}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-center">After</h3>
                      <Image
                        src={image.after}
                        alt={`After ${image.type} cleaning`}
                        width={600}
                        height={400}
                        className="rounded-md w-full h-auto object-cover"
                        data-ai-hint={image.hint.split(' ')[1]}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
