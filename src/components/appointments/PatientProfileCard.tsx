import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

export const PatientProfileCard = ({ patient, onUpdate }: any) => {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Patient Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <Input 
              value={patient.fullName} 
              onChange={(e) => onUpdate({ fullName: e.target.value })}
              className="font-medium"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <Input 
              value={patient.phone} 
              onChange={(e) => onUpdate({ phone: e.target.value })}
              className="font-medium"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date of Birth</p>
            <Input 
              type="date"
              value={patient.dob} 
              onChange={(e) => onUpdate({ dob: e.target.value })}
              className="font-medium"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <Input 
              type="email"
              value={patient.email} 
              onChange={(e) => onUpdate({ email: e.target.value })}
              className="font-medium"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <Input 
              value={patient.address} 
              onChange={(e) => onUpdate({ address: e.target.value })}
              className="font-medium"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">State</p>
            <Input 
              value={patient.state} 
              onChange={(e) => onUpdate({ state: e.target.value })}
              className="font-medium"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Postal Code</p>
            <Input 
              value={patient.postalCode} 
              onChange={(e) => onUpdate({ postalCode: e.target.value })}
              className="font-medium"
            />
          </div>
        </div>
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Insurance Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Insurance Name</p>
              <Input 
                value={patient.insurance.name} 
                onChange={(e) => onUpdate({ insurance: { ...patient.insurance, name: e.target.value } })}
                className="font-medium"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Plan Name</p>
              <Input 
                value={patient.insurance.planName} 
                onChange={(e) => onUpdate({ insurance: { ...patient.insurance, planName: e.target.value } })}
                className="font-medium"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Plan Type</p>
              <Input 
                value={patient.insurance.planType} 
                onChange={(e) => onUpdate({ insurance: { ...patient.insurance, planType: e.target.value } })}
                className="font-medium"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Member ID</p>
              <Input 
                value={patient.insurance.memberId} 
                onChange={(e) => onUpdate({ insurance: { ...patient.insurance, memberId: e.target.value } })}
                className="font-medium"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};