import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface StaffMember {
  name: string;
  email: string;
  phone: string;
  designation: string;
}

interface StaffMembersTableProps {
  staffMembers: StaffMember[];
}

export const StaffMembersTable = ({ staffMembers }: StaffMembersTableProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Staff Members</h3>
        <Button>Add Staff Member</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Designation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffMembers.map((staff, index) => (
            <TableRow key={index}>
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.email}</TableCell>
              <TableCell>{staff.phone}</TableCell>
              <TableCell>{staff.designation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};