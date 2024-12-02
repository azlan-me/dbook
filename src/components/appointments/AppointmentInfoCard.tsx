import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";

export const AppointmentInfoCard = ({ appointment, onUpdate }: any) => {
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
            <Input 
              type="date" 
              value={appointment.date} 
              onChange={(e) => onUpdate({ date: e.target.value })}
              className="font-medium"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Time</p>
            <Input 
              type="time" 
              value={appointment.time} 
              onChange={(e) => onUpdate({ time: e.target.value })}
              className="font-medium"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Service Type</p>
            <Input 
              value={appointment.serviceType} 
              onChange={(e) => onUpdate({ serviceType: e.target.value })}
              className="font-medium"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge className="bg-green-500 text-white">
              {appointment.status}
            </Badge>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Description</p>
          <Input 
            value={appointment.description} 
            onChange={(e) => onUpdate({ description: e.target.value })}
            className="font-medium"
          />
        </div>
      </CardContent>
    </Card>
  );
};