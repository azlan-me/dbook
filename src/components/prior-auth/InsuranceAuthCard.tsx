import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface ChangeHistory {
  id: string;
  value: string;
  timestamp: string;
  user: string;
}

interface InsuranceAuthProps {
  authNumber: string;
  onUpdate: (value: string) => void;
  isEditing: boolean;
}

export function InsuranceAuthCard({ authNumber, onUpdate, isEditing }: InsuranceAuthProps) {
  const [history, setHistory] = useState<ChangeHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleUpdate = (value: string) => {
    if (value.length > 0 && value !== authNumber) {
      const change: ChangeHistory = {
        id: Math.random().toString(36).substr(2, 9),
        value,
        timestamp: new Date().toISOString(),
        user: "Current User", // Replace with actual user
      };
      setHistory((prev) => [change, ...prev]);
      onUpdate(value);
    }
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Insurance Authorization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Pre-Authorization Number</label>
          <Input
            value={authNumber}
            onChange={(e) => handleUpdate(e.target.value)}
            disabled={!isEditing}
            placeholder="Enter authorization number"
            pattern="[A-Za-z0-9-]+"
          />
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowHistory(!showHistory)}
          className="w-full"
        >
          <History className="h-4 w-4 mr-2" />
          {showHistory ? "Hide History" : "Show History"}
        </Button>

        {showHistory && (
          <div className="space-y-2">
            {history.map((change) => (
              <div
                key={change.id}
                className="text-sm p-2 rounded-lg bg-accent/50"
              >
                <p>Changed to: {change.value}</p>
                <p className="text-muted-foreground">
                  By {change.user} on {format(new Date(change.timestamp), "PPpp")}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}