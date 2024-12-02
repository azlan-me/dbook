import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { PhoneInput } from "@/components/ui/phone-input";
import { Input } from "@/components/ui/input";

interface AuthPatientCardProps {
  patient: {
    fullName: string;
    phone: string;
    dob: string;
    address: string;
    email: string;
    state: string;
    postalCode: string;
    insurance: {
      provider: string;
      planName: string;
      planType: string;
      memberId: string;
    };
  };
  onUpdate: (updates: Partial<AuthPatientCardProps['patient']>) => void;
  isEditing?: boolean;
}

export function AuthPatientCard({ patient, onUpdate, isEditing = false }: AuthPatientCardProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Patient Demographics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Full Name</label>
            <Input
              value={patient.fullName}
              onChange={(e) => onUpdate({ fullName: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Phone</label>
            <PhoneInput
              value={patient.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Date of Birth</label>
            <Input
              type="date"
              value={patient.dob}
              onChange={(e) => onUpdate({ dob: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <Input
              type="email"
              value={patient.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-muted-foreground">Address</label>
            <Input
              value={patient.address}
              onChange={(e) => onUpdate({ address: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">State</label>
            <Input
              value={patient.state}
              onChange={(e) => onUpdate({ state: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Postal Code</label>
            <Input
              value={patient.postalCode}
              onChange={(e) => onUpdate({ postalCode: e.target.value })}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Insurance Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Insurance Provider</label>
              <Input
                value={patient.insurance.provider}
                onChange={(e) => onUpdate({ insurance: { ...patient.insurance, provider: e.target.value } })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Plan Name</label>
              <Input
                value={patient.insurance.planName}
                onChange={(e) => onUpdate({ insurance: { ...patient.insurance, planName: e.target.value } })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Plan Type</label>
              <Input
                value={patient.insurance.planType}
                onChange={(e) => onUpdate({ insurance: { ...patient.insurance, planType: e.target.value } })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Member ID</label>
              <Input
                value={patient.insurance.memberId}
                onChange={(e) => onUpdate({ insurance: { ...patient.insurance, memberId: e.target.value } })}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}