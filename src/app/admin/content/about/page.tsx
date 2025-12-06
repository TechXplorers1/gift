
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, PlusCircle, Upload, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const initialTeamMembers = [
  { id: 1, name: "Grace Founder", role: "Founder & Lead Detailer", imageUrl: "https://placehold.co/400x400" },
  { id: 2, name: "John Sparkle", role: "House Cleaning Supervisor", imageUrl: "https://placehold.co/400x400" },
  { id: 3, name: "Emily Shine", role: "Customer Relations", imageUrl: "https://placehold.co/400x400" },
];

type TeamMember = typeof initialTeamMembers[0];

export default function EditAboutPage() {
  const [teamMembers, setTeamMembers] = React.useState(initialTeamMembers);
  const { toast } = useToast();

  const handleMemberChange = (id: number, field: keyof TeamMember, value: string) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };
  
  const handleImageUpload = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleMemberChange(id, 'imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTeamMember = () => {
    const newId = teamMembers.length > 0 ? Math.max(...teamMembers.map(m => m.id)) + 1 : 1;
    setTeamMembers([...teamMembers, { id: newId, name: "", role: "", imageUrl: "https://placehold.co/400x400" }]);
  };

  const removeTeamMember = (id: number) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };
  
  const handleSaveChanges = () => {
    // Here you would typically send the data to your backend to save it.
    console.log("Saving changes:", { teamMembers });
    toast({
        title: "Changes Saved!",
        description: "The 'About Us' page has been updated.",
    })
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4">
            <Link href="/admin/content">
                <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4"/>
                </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Edit 'About Us' Page</h2>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Update photos, names, and roles for your team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col md:flex-row items-start gap-6 p-4 border rounded-lg">
              <div className="flex flex-col items-center gap-2">
                 <Avatar className="w-24 h-24 border-4 border-primary">
                  <AvatarImage src={member.imageUrl} alt={member.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button asChild variant="outline" size="sm">
                    <label htmlFor={`upload-${member.id}`} className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4"/>
                        Change Image
                        <input id={`upload-${member.id}`} type="file" className="sr-only" accept="image/*" onChange={(e) => handleImageUpload(member.id, e)} />
                    </label>
                </Button>
              </div>
              <div className="flex-grow w-full space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor={`name-${member.id}`}>Name</Label>
                        <Input
                        id={`name-${member.id}`}
                        value={member.name}
                        onChange={(e) => handleMemberChange(member.id, "name", e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor={`role-${member.id}`}>Role</Label>
                        <Input
                        id={`role-${member.id}`}
                        value={member.role}
                        onChange={(e) => handleMemberChange(member.id, "role", e.target.value)}
                        />
                    </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeTeamMember(member.id)} aria-label="Remove member" className="text-destructive hover:text-destructive-foreground hover:bg-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
           <Button variant="outline" onClick={addTeamMember}>
                <PlusCircle className="mr-2 h-4 w-4"/>
                Add Team Member
            </Button>
        </CardContent>
      </Card>
      
       <div className="flex justify-end mt-6">
            <Button onClick={handleSaveChanges} size="lg">Save Changes</Button>
        </div>
    </div>
  );
}
