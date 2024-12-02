import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LocationDetailsProps {
  location: {
    name: string;
    address: string;
    landmark?: string;
  };
  onUpdate?: (updates: Partial<LocationDetailsProps['location']>) => void;
  isEditing?: boolean;
}

export function LocationDetailsCard({ location, onUpdate, isEditing = false }: LocationDetailsProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Facility Name</p>
          {isEditing ? (
            <Input
              value={location.name}
              onChange={(e) => onUpdate?.({ name: e.target.value })}
            />
          ) : (
            <p className="font-medium">{location.name}</p>
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Address</p>
          {isEditing ? (
            <Input
              value={location.address}
              onChange={(e) => onUpdate?.({ address: e.target.value })}
            />
          ) : (
            <p className="font-medium">{location.address}</p>
          )}
        </div>
        {(location.landmark || isEditing) && (
          <div>
            <p className="text-sm text-muted-foreground">Landmark</p>
            {isEditing ? (
              <Input
                value={location.landmark || ''}
                onChange={(e) => onUpdate?.({ landmark: e.target.value })}
              />
            ) : (
              <p className="font-medium">{location.landmark}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}