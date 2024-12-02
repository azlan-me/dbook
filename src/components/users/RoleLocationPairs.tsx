import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

export interface RoleLocationPair {
  role: string;
  location: string;
}

interface RoleLocationPairsProps {
  pairs: RoleLocationPair[];
  onChange: (pairs: RoleLocationPair[]) => void;
}

const roles = [
  "Administrator",
  "Assistant",
  "Provider",
  "Billing Team",
  "Call Center",
  "Provider Advanced",
  "Receptionist",
];

const locations = [
  "Dental 360 Berwyn",
  "Dental 360 Mundelein II",
  "Mundelein Dental Clinic",
];

export const RoleLocationPairs = ({ pairs, onChange }: RoleLocationPairsProps) => {
  const handleAddPair = () => {
    onChange([...pairs, { role: "Assistant", location: locations[0] }]);
  };

  const handleRemovePair = (index: number) => {
    const newPairs = pairs.filter((_, i) => i !== index);
    onChange(newPairs);
  };

  const handlePairChange = (index: number, field: keyof RoleLocationPair, value: string) => {
    const newPairs = pairs.map((pair, i) => {
      if (i === index) {
        return { ...pair, [field]: value };
      }
      return pair;
    });
    onChange(newPairs);
  };

  return (
    <div className="space-y-4">
      {pairs.map((pair, index) => (
        <div key={index} className="flex gap-4 items-start">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">User role *</label>
            <Select
              value={pair.role}
              onValueChange={(value) => handlePairChange(index, "role", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Location *</label>
            <Select
              value={pair.location}
              onValueChange={(value) => handlePairChange(index, "location", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="mt-8"
            onClick={() => handleRemovePair(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={handleAddPair}
        className="w-[140px]"
      >
        Add New Role
      </Button>
    </div>
  );
};