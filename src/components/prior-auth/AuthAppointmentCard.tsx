import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface AuthAppointmentCardProps {
  appointment: {
    date: string;
    time: string;
    type: string;
    duration: string;
  };
  onUpdate?: (updates: Partial<AuthAppointmentCardProps['appointment']>) => void;
  isEditing?: boolean;
}

export function AuthAppointmentCard({ appointment, onUpdate, isEditing = false }: AuthAppointmentCardProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Appointment Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Date</p>
            {isEditing ? (
              <Input
                type="date"
                value={appointment.date}
                onChange={(e) => onUpdate?.({ date: e.target.value })}
              />
            ) : (
              <p className="font-medium">
                {format(new Date(appointment.date), "MMM dd, yyyy")}
              </p>
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Time</p>
            {isEditing ? (
              <Input
                type="time"
                value={appointment.time}
                onChange={(e) => onUpdate?.({ time: e.target.value })}
              />
            ) : (
              <p className="font-medium">{appointment.time}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Type</p>
            {isEditing ? (
              <Input
                value={appointment.type}
                onChange={(e) => onUpdate?.({ type: e.target.value })}
              />
            ) : (
              <p className="font-medium">{appointment.type}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Duration</p>
            {isEditing ? (
              <Input
                value={appointment.duration}
                onChange={(e) => onUpdate?.({ duration: e.target.value })}
              />
            ) : (
              <p className="font-medium">{appointment.duration}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}