
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileEdit, Image as ImageIcon, BookOpen, Presentation } from "lucide-react";
import Link from "next/link";

const cmsFeatures = [
  {
    title: "Homepage Content",
    description: "Edit banners, headlines, and service descriptions.",
    icon: <FileEdit className="h-6 w-6" />,
    link: "/admin/content/homepage",
    disabled: true,
  },
  {
    title: "About Us Page",
    description: "Update the company story, team bios, and mission.",
    icon: <BookOpen className="h-6 w-6" />,
    link: "/admin/content/about",
    disabled: false,
  },
  {
    title: "Blog Posts & Tips",
    description: "Create and manage articles, tips, and promotions.",
    icon: <Presentation className="h-6 w-6" />,
    link: "/admin/content/blog",
    disabled: true,
  },
  {
    title: "Gallery Images",
    description: "Manage 'Before & After' photos in the gallery.",
    icon: <ImageIcon className="h-6 w-6" />,
    link: "/admin/content/gallery",
    disabled: true,
  },
];

export default function ContentManagementPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Website Content</CardTitle>
          <CardDescription>
            Update your website's text, images, and blog posts from this central hub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cmsFeatures.map((feature) => (
              <Card key={feature.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-md text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                <CardContent>
                  <Button asChild variant="outline" className="w-full" disabled={feature.disabled}>
                    <Link href={feature.link}>Manage Content</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
