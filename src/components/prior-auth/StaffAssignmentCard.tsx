import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  assignedAt: string;
}

export function StaffAssignmentCard() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);

  const handleAddStaff = () => {
    const newStaff: StaffMember = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Staff Member",
      role: "Assistant",
      assignedAt: new Date().toISOString(),
    };
    setStaffMembers((prev) => [...prev, newStaff]);
  };

  const handleRemoveStaff = (id: string) => {
    setStaffMembers((prev) => prev.filter((staff) => staff.id !== id));
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Staff Assignment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleAddStaff} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>

        <div className="space-y-2">
          {staffMembers.map((staff) => (
            <div
              key={staff.id}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50"
            >
              <Select defaultValue={staff.role}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Doctor">Doctor</SelectItem>
                  <SelectItem value="Nurse">Nurse</SelectItem>
                  <SelectItem value="Assistant">Assistant</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <span className="flex-1">{staff.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveStaff(staff.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}