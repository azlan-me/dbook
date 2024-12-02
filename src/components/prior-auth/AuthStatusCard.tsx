import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";
import { StatusSelect } from "@/components/prior-auth/StatusSelect";
import { format } from "date-fns";

interface AuthStatusCardProps {
  status: string;
  lastUpdated: string;
  updatedBy: string;
  onStatusChange: (status: string) => void;
}

export function AuthStatusCard({ status, lastUpdated, updatedBy, onStatusChange }: AuthStatusCardProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5" />
          Authorization Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Current Status</p>
          <StatusSelect value={status} onValueChange={onStatusChange} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Last Updated</p>
            <p className="font-medium">
              {format(new Date(lastUpdated), "MMM dd, yyyy HH:mm")}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Updated By</p>
            <p className="font-medium">{updatedBy}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}