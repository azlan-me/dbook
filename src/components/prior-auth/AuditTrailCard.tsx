import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";
import { format } from "date-fns";

interface AuditEntry {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details: string;
}

interface AuditTrailProps {
  entries: AuditEntry[];
}

export function AuditTrailCard({ entries }: AuditTrailProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Audit Trail
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="border-l-2 border-primary pl-4 space-y-1"
            >
              <p className="text-sm font-medium">{entry.action}</p>
              <p className="text-sm text-muted-foreground">
                By {entry.user} on {format(new Date(entry.timestamp), "PPpp")}
              </p>
              <p className="text-sm">{entry.details}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}