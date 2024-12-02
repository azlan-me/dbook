import { useParams, useNavigate } from "react-router-dom";
import { AppointmentInfoCard } from "@/components/appointments/AppointmentInfoCard";
import { PatientProfileCard } from "@/components/appointments/PatientProfileCard";
import { StatusSelect } from "@/components/appointments/StatusSelect";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Building, Users, MessageSquare } from "lucide-react";

// Mock data for demonstration
const appointment = {
  id: "1",
  date: "2024-03-20",
  time: "10:00 AM",
  serviceType: "Dental Cleaning",
  description: "Regular dental cleaning and checkup",
  status: "Confirmed",
  createdAt: "March 15, 2024",
  createdBy: "Dr. Smith",
  location: "Main Clinic",
  patient: {
    fullName: "John Doe",
    phone: "+1 (555) 123-4567",
    dob: "1985-01-15",
    email: "john.doe@example.com",
    address: "123 Main St",
    state: "California",
    postalCode: "12345",
    insurance: {
      name: "DentalCare Plus",
      planName: "Premium Care",
      planType: "PPO",
      memberId: "DC123456789",
    },
  },
  staff: [
    { id: 1, name: "Dr. Sarah Johnson", role: "Dentist" },
    { id: 2, name: "Mike Wilson", role: "Dental Assistant" },
  ],
  communications: [
    {
      id: 1,
      date: "March 15, 2024",
      type: "Phone Call",
      note: "Confirmed appointment details",
      staff: "Reception",
    },
  ],
};

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState(appointment);

  const handleUpdate = (section: string, updates: any) => {
    setAppointmentData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], ...updates },
    }));
    toast.success("Changes saved successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="p-4 sm:p-8 lg:pl-72">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Appointment Details
            </h1>
            <Button variant="outline" onClick={() => navigate("/appointments")}>
              Back to Appointments
            </Button>
          </div>
          <p className="text-muted-foreground">
            Viewing appointment #{appointmentData.id}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AppointmentInfoCard
            appointment={appointmentData}
            onUpdate={(updates: any) => handleUpdate('appointment', updates)}
          />
          <PatientProfileCard
            patient={appointmentData.patient}
            onUpdate={(updates: any) => handleUpdate('patient', updates)}
          />

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Status & Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Status</p>
                <StatusSelect
                  value={appointmentData.status}
                  onValueChange={(value) => handleUpdate('appointment', { status: value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Created At</p>
                  <p className="font-medium">{appointmentData.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created By</p>
                  <p className="font-medium">{appointmentData.createdBy}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Location Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Location</p>
                <p className="font-medium">{appointmentData.location}</p>
              </div>
              <Button variant="outline" className="w-full">
                Change Location
              </Button>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Staff Assignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {appointmentData.staff.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                Add Staff Member
              </Button>
            </CardContent>
          </Card>

          <Card className="glass md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Communication Log
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {appointmentData.communications.map((comm) => (
                  <div
                    key={comm.id}
                    className="flex flex-col gap-2 p-4 rounded-lg border"
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">{comm.type}</p>
                      <p className="text-sm text-muted-foreground">{comm.date}</p>
                    </div>
                    <p className="text-sm">{comm.note}</p>
                    <p className="text-sm text-muted-foreground">By: {comm.staff}</p>
                  </div>
                ))}
              </div>
              <Button className="w-full">Add Communication Entry</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;