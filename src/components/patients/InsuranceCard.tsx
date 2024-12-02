import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

interface InsuranceProps {
  data: {
    name: string;
    planName: string;
    planType: string;
    memberId: string;
  };
  onUpdate: (data: Partial<InsuranceProps['data']>) => void;
  isEditing?: boolean;
}

export function InsuranceCard({ data, onUpdate, isEditing = true }: InsuranceProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Insurance Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Insurance Provider</label>
            <Input
              value={data.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Plan Name</label>
            <Input
              value={data.planName}
              onChange={(e) => onUpdate({ planName: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Plan Type</label>
            <Input
              value={data.planType}
              onChange={(e) => onUpdate({ planType: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Member ID</label>
            <Input
              value={data.memberId}
              onChange={(e) => onUpdate({ memberId: e.target.value })}
              disabled={!isEditing}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}