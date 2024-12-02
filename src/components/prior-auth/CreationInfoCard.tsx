import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { format } from "date-fns";

interface CreationInfoProps {
  info: {
    createdBy: {
      name: string;
      id: string;
    };
    createdAt: string;
    lastModified: {
      by: string;
      at: string;
    };
  };
}

export function CreationInfoCard({ info }: CreationInfoProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Creation Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Created By</p>
          <p className="font-medium">{info.createdBy.name} (ID: {info.createdBy.id})</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Created At</p>
          <p className="font-medium">{format(new Date(info.createdAt), "PPpp")}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Last Modified</p>
          <p className="font-medium">
            By {info.lastModified.by} on {format(new Date(info.lastModified.at), "PPpp")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}