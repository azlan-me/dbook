import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";

interface AuthRequestProps {
  data: {
    id: string;
    fullName: string;
    phone: string;
    dob: string;
    notes: string;
  };
  onUpdate: (updates: Partial<AuthRequestProps['data']>) => void;
  isEditing: boolean;
}

export function AuthRequestCard({ data, onUpdate, isEditing }: AuthRequestProps) {
  const handleIdChange = (value: string) => {
    // Only allow numbers and limit to 17 digits
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 17) {
      onUpdate({ id: numericValue });
    }
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Authorization Request Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Pre-Authorization ID</label>
            <Input
              value={data.id}
              onChange={(e) => handleIdChange(e.target.value)}
              disabled={!isEditing}
              maxLength={17}
              pattern="\d{17}"
              placeholder="YYYYXXXXXXXXXXXXX"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Full Name</label>
            <Input
              value={data.fullName}
              onChange={(e) => onUpdate({ fullName: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Phone Number</label>
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
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Additional Notes</label>
          <Textarea
            value={data.notes}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            disabled={!isEditing}
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}