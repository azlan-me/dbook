import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses = [
  "Created",
  "Requested Sent",
  "Approved",
  "Denied",
  "Info Required",
  "Partially Approved",
  "Service not reviewed",
  "Not required",
  "Complete",
  "Scheduled"
];

export const StatusSelect = ({ value, onValueChange }: { 
  value: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
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