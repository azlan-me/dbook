import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

// Mock data for demonstration
const appointments = [
  {
    id: 1,
    date: "2024-03-20",
    time: "10:00 AM",
    patientName: "John Doe",
    location: "Main Clinic",
    createdDate: "2024-03-15",
    status: "Pending"
  },
  // Add more mock appointments as needed
];

export default function Appointments() {
  const navigate = useNavigate();
  console.log("Rendering Appointments page");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="p-4 sm:p-8 lg:pl-72">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Appointments</h1>
          <Button onClick={() => navigate("/appointments/new")}>
            New Appointment
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Sr#</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment, index) => (
                <TableRow key={appointment.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{format(new Date(appointment.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.location}</TableCell>
                  <TableCell>{format(new Date(appointment.createdDate), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/appointments/details/${appointment.id}`)}
                    >
                      View & Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}