import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses = [
  "New",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
  "Voice Mail",
  "Scheduled"
];

export const StatusSelect = ({ value, onValueChange }: { 
  value: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};