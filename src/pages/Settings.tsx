import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          <div className="space-y-8">
            {/* Profile Picture Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Profile Picture</h2>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={image || ""} />
                  <AvatarFallback>
                    {localStorage.getItem("username")?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="picture" className="cursor-pointer">
                    <div className="flex items-center gap-2 text-sm text-primary hover:text-primary/80">
                      <Camera className="h-4 w-4" />
                      Upload new picture
                    </div>
                  </Label>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, GIF or PNG. Max size of 2MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Description Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About Me</h2>
              <Textarea
                placeholder="Write a brief description about yourself..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Account Settings Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Account Settings</h2>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    defaultValue={localStorage.getItem("email") || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    defaultValue={localStorage.getItem("username") || ""}
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}