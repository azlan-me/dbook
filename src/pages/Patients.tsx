import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sidebar } from "@/components/Sidebar";
import { useNavigate } from "react-router-dom";

// Mock data - replace with actual API call
const mockPatients = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  fullName: `Patient ${i + 1}`,
  email: `patient${i + 1}@example.com`,
  phone: `+1 555-${String(i + 1).padStart(4, '0')}`,
  insuranceName: `Insurance Provider ${(i % 5) + 1}`,
  dateOfBirth: new Date(1980 + i % 30, i % 12, (i % 28) + 1).toISOString().split('T')[0],
}));

const ITEMS_PER_PAGE = 10;

export default function Patients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: patients } = useQuery({
    queryKey: ["patients"],
    queryFn: () => mockPatients,
  });

  const filteredPatients = patients?.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();
    switch (filterType) {
      case "name":
        return patient.fullName.toLowerCase().includes(searchLower);
      case "phone":
        return patient.phone.toLowerCase().includes(searchLower);
      case "dob":
        return patient.dateOfBirth.includes(searchTerm);
      default:
        return true;
    }
  }) || [];

  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="p-8 lg:pl-72">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold">Patients</h1>
            <Button onClick={() => navigate("/patients/new")} className="whitespace-nowrap">
              Add New Patient
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select
              value={filterType}
              onValueChange={setFilterType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="dob">Date of Birth</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Insurance Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.fullName}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.insuranceName}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/patients/${patient.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="py-2 px-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}