import { NewAppointmentForm } from "@/components/appointments/NewAppointmentForm";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function NewAppointment() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="p-8 lg:pl-72">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">New Appointment</h1>
          <Button variant="outline" onClick={() => navigate("/appointments")}>
            Back to Appointments
          </Button>
        </div>
        <NewAppointmentForm onClose={() => navigate("/appointments")} patientId="1" />
      </div>
    </div>
  );
}