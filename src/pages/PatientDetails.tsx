import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { z } from "zod";
import { PersonalInfoCard } from "@/components/patients/PersonalInfoCard";
import { InsuranceCard } from "@/components/patients/InsuranceCard";
import { NewAppointmentForm } from "@/components/appointments/NewAppointmentForm";

const patientSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
  dob: z.string().min(1, "Date of birth is required"),
  insurance: z.object({
    name: z.string().min(2, "Insurance name must be at least 2 characters"),
    planName: z.string().min(2, "Plan name must be at least 2 characters"),
    planType: z.string().min(2, "Plan type must be at least 2 characters"),
    memberId: z.string().min(2, "Member ID must be at least 2 characters"),
  }),
});

const mockPatient = {
  id: 1,
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+1 555-0123",
  address: "123 Main St",
  state: "CA",
  postalCode: "12345", // Added missing field
  dob: "1990-01-01", // Added missing field
  insurance: {
    name: "Health Plus",
    planName: "Premium Care",
    planType: "PPO",
    memberId: "HP123456",
  },
  appointments: [
    {
      id: 1,
      date: "2024-03-15",
      time: "09:00",
      doctor: "Dr. Smith",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-04-20",
      time: "14:30",
      doctor: "Dr. Johnson",
      status: "Scheduled",
    },
  ],
};

export default function PatientDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [formData, setFormData] = useState(mockPatient);

  const { data: patient } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => mockPatient,
  });

  const handleUpdate = (section: string, updates: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...updates },
    }));
  };

  const handleSave = () => {
    try {
      patientSchema.parse(formData);
      setIsEditing(false);
      toast.success("Patient information updated successfully");
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
    }
  };

  if (!patient) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64 p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Patient Details</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/patients")}>
              Back to Patients List
            </Button>
            <Button onClick={() => setShowNewAppointment(true)}>
              New Appointment
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {showNewAppointment && (
            <NewAppointmentForm
              patientId={id!}
              onClose={() => setShowNewAppointment(false)}
            />
          )}

          <PersonalInfoCard
            data={formData}
            onUpdate={(updates) => handleUpdate("patient", updates)}
            isEditing={isEditing}
          />

          <InsuranceCard
            data={formData.insurance}
            onUpdate={(updates) => handleUpdate("insurance", updates)}
            isEditing={isEditing}
          />

          <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Appointment History</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patient.appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>{appointment.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end gap-4">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData(patient);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Information</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}