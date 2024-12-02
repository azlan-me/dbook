import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { User } from "lucide-react";

interface PersonalInfoProps {
  data: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    state: string;
    postalCode: string;
    dob: string;
  };
  onUpdate: (data: Partial<PersonalInfoProps['data']>) => void;
  isEditing?: boolean;
}

export function PersonalInfoCard({ data, onUpdate, isEditing = true }: PersonalInfoProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Full Name</label>
            <Input
              value={data.fullName}
              onChange={(e) => onUpdate({ fullName: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Phone</label>
            <PhoneInput
              value={data.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Date of Birth</label>
            <Input
              type="date"
              value={data.dob}
              onChange={(e) => onUpdate({ dob: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Address</label>
            <Input
              value={data.address}
              onChange={(e) => onUpdate({ address: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">State</label>
            <Input
              value={data.state}
              onChange={(e) => onUpdate({ state: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Postal Code</label>
            <Input
              value={data.postalCode}
              onChange={(e) => onUpdate({ postalCode: e.target.value })}
              disabled={!isEditing}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}