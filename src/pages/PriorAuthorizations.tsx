import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Filter, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusSelect } from "@/components/prior-auth/StatusSelect";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { StaffMembersTable } from "@/components/prior-auth/StaffMembersTable";

// Mock data
const mockPriorAuths = [
  {
    id: "20240000000000001", // Updated to 17 digits starting with year
    locationName: "Main Clinic",
    patientName: "John Doe",
    appointmentDate: "2024-03-20",
    phone: "(555) 123-4567",
    status: "Created",
    createdBy: "Dr. Smith",
    createdDate: "2024-03-15",
  },
  // Add more mock data as needed
];

const mockLocations = [
  { id: 1, name: "Main Clinic" },
  { id: 2, name: "North Branch" },
  // Add more locations as needed
];

const statusOptions = [
  "Created",
  "Request Sent",
  "Partially Approved",
  "Approved",
  "Denied",
  "Info Required",
  "Service Not Reviewed",
  "Not Required",
  "Scheduled",
];

export default function PriorAuthorizations() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);

  const handleLocationToggle = (locationId: number) => {
    setSelectedLocations((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleQuickFilter = (status: string) => {
    setSelectedStatus(status);
  };

  const handleCreate = () => {
    // Generate a new ID with the current year and zeros
    const currentYear = new Date().getFullYear();
    const newId = `${currentYear}${'0'.repeat(13)}1`;
    
    // Navigate to new auth page with empty state
    navigate("/prior-auth/new", {
      state: {
        isNew: true,
        id: newId
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="p-4 sm:p-8 lg:pl-72">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">Prior Authorizations</h1>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Create Prior Authorization
            </Button>
          </div>

          {/* Search */}
          <div className="w-full">
            <Input
              placeholder="Search by Pre-Auth ID, Location, Patient Name, Phone Number, or DOB"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Quick Status Filters */}
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? "default" : "outline"}
                onClick={() => handleQuickFilter(status)}
                size="sm"
              >
                {status}
              </Button>
            ))}
          </div>

          {/* Advanced Filters */}
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full sm:w-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {showFilters ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>

            {showFilters && (
              <div className="grid gap-4 p-4 border rounded-lg">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Start Date
                    </label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      End Date
                    </label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <StatusSelect
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Locations
                  </label>
                  <div className="space-y-2">
                    {mockLocations.map((location) => (
                      <div
                        key={location.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`location-${location.id}`}
                          checked={selectedLocations.includes(location.id)}
                          onCheckedChange={() => handleLocationToggle(location.id)}
                        />
                        <label
                          htmlFor={`location-${location.id}`}
                          className="text-sm"
                        >
                          {location.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full sm:w-auto">Apply Filters</Button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pre-Auth ID</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Appointment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPriorAuths.map((auth) => (
                  <TableRow key={auth.id}>
                    <TableCell>{auth.id}</TableCell>
                    <TableCell>{auth.locationName}</TableCell>
                    <TableCell>{auth.patientName}</TableCell>
                    <TableCell>{auth.phone}</TableCell>
                    <TableCell>
                      {auth.appointmentDate
                        ? format(new Date(auth.appointmentDate), "MMM dd, yyyy")
                        : "No Appointment Listed"}
                    </TableCell>
                    <TableCell>{auth.status}</TableCell>
                    <TableCell>{auth.createdBy}</TableCell>
                    <TableCell>
                      {format(new Date(auth.createdDate), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/prior-auth/${auth.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
