import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { User } from "lucide-react";
import { RoleLocationPairs, type RoleLocationPair } from "@/components/users/RoleLocationPairs";

// This would typically come from an API
const dummyUsers = {
  "1": {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john@example.com",
    status: "Active",
    phone: "+1234567890",
    roleLocationPairs: [
      { role: "Assistant", location: "Dental 360 Berwyn" },
      { role: "Assistant", location: "Dental 360 Mundelein II" }
    ],
  },
  "2": {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith",
    email: "jane@example.com",
    status: "Inactive",
    phone: "+0987654321",
    roleLocationPairs: [
      { role: "Administrator", location: "Mundelein Dental Clinic" }
    ],
  },
};

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(dummyUsers[id as keyof typeof dummyUsers]);

  const handleUpdate = (field: string, value: string | RoleLocationPair[]) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated user data:", userData);
    toast.success("User updated successfully");
    navigate("/manage-users");
  };

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="p-4 sm:p-8 lg:pl-72">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Edit User</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    value={userData.firstName}
                    onChange={(e) => handleUpdate("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    value={userData.lastName}
                    onChange={(e) => handleUpdate("lastName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    value={userData.username}
                    onChange={(e) => handleUpdate("username", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleUpdate("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={userData.phone}
                    onChange={(e) => handleUpdate("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Input
                    value={userData.status}
                    onChange={(e) => handleUpdate("status", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Roles & Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <RoleLocationPairs
                pairs={userData.roleLocationPairs}
                onChange={(pairs) => handleUpdate("roleLocationPairs", pairs)}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/manage-users")}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}