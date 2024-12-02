import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AuthAppointmentCard } from "@/components/prior-auth/AuthAppointmentCard";
import { AuthPatientCard } from "@/components/prior-auth/AuthPatientCard";
import { AuthStatusCard } from "@/components/prior-auth/AuthStatusCard";
import { LocationDetailsCard } from "@/components/prior-auth/LocationDetailsCard";
import { CreationInfoCard } from "@/components/prior-auth/CreationInfoCard";
import { DocumentationCard } from "@/components/prior-auth/DocumentationCard";
import { StaffAssignmentCard } from "@/components/prior-auth/StaffAssignmentCard";
import { AuditTrailCard } from "@/components/prior-auth/AuditTrailCard";
import { NotesCard } from "@/components/prior-auth/NotesCard";
import { AuthRequestCard } from "@/components/prior-auth/AuthRequestCard";
import { InsuranceAuthCard } from "@/components/prior-auth/InsuranceAuthCard";
import { Save } from "lucide-react";

const mockPriorAuth = {
  id: "20240000000000001", // Updated to 17 digits starting with year
  appointment: {
    date: "2024-03-20",
    time: "10:00 AM",
    type: "Dental Cleaning",
    duration: "1 hour",
  },
  patient: {
    fullName: "John Doe",
    phone: "(555) 123-4567",
    dob: "1990-01-15",
    address: "123 Main St",
    email: "john@example.com",
    state: "California",
    postalCode: "12345",
    insurance: {
      provider: "DentalCare Plus",
      planName: "Premium Care",
      planType: "PPO",
      memberId: "DC123456789",
    },
  },
  location: {
    name: "Main Clinic",
    address: "456 Medical Center Blvd",
    landmark: "Next to Central Park",
  },
  creationInfo: {
    createdBy: {
      name: "Dr. Smith",
      id: "DOC123",
    },
    createdAt: "2024-03-15T10:00:00Z",
    lastModified: {
      by: "Dr. Johnson",
      at: "2024-03-16T15:30:00Z",
    },
  },
  auditTrail: [
    {
      id: "1",
      user: "Dr. Smith",
      action: "Created Prior Authorization",
      timestamp: "2024-03-15T10:00:00Z",
      details: "Initial creation of prior authorization request",
    },
  ],
  status: "Pending",
  lastUpdated: "2024-03-15T10:00:00Z",
  updatedBy: "Dr. Smith",
  notes: "",
  authNumber: "",
};

export default function PriorAuthDetails() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(true); // Set to true to make all fields editable by default
  const [formData, setFormData] = useState(mockPriorAuth);

  const { data: priorAuth } = useQuery({
    queryKey: ["prior-auth", id],
    queryFn: () => mockPriorAuth,
  });

  const handleSaveAll = () => {
    console.log("Saving all changes:", formData);
    toast.success("All changes saved successfully");
  };

  const handleCardUpdate = (cardName: string, updates: any) => {
    console.log(`Updating ${cardName}:`, updates);
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
    toast.success(`${cardName} updated successfully`);
  };

  if (!priorAuth) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="p-4 sm:p-8 lg:pl-72">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Prior Authorization Details
            </h1>
            <p className="text-muted-foreground">
              Viewing prior authorization #{priorAuth.id}
            </p>
          </div>
          <Button onClick={handleSaveAll}>
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <AuthAppointmentCard 
              appointment={formData.appointment} 
              onUpdate={(updates) => handleCardUpdate('Appointment', { appointment: { ...formData.appointment, ...updates }})}
              isEditing={isEditing}
            />
            <Button onClick={() => handleCardUpdate('Appointment', formData.appointment)} className="w-full">
              Update Appointment
            </Button>
          </div>

          <div className="space-y-4">
            <AuthPatientCard
              patient={formData.patient}
              onUpdate={(updates) => handleCardUpdate('Patient', { patient: { ...formData.patient, ...updates }})}
              isEditing={isEditing}
            />
            <Button onClick={() => handleCardUpdate('Patient', formData.patient)} className="w-full">
              Update Patient Info
            </Button>
          </div>

          <div className="space-y-4">
            <AuthStatusCard
              status={formData.status}
              lastUpdated={formData.lastUpdated}
              updatedBy={formData.updatedBy}
              onStatusChange={(status) => handleCardUpdate('Status', { status })}
            />
            <Button onClick={() => handleCardUpdate('Status', { status: formData.status })} className="w-full">
              Update Status
            </Button>
          </div>

          <div className="space-y-4">
            <LocationDetailsCard 
              location={formData.location} 
              onUpdate={(updates) => handleCardUpdate('Location', { location: { ...formData.location, ...updates }})}
              isEditing={isEditing}
            />
            <Button onClick={() => handleCardUpdate('Location', formData.location)} className="w-full">
              Update Location
            </Button>
          </div>

          <div className="space-y-4">
            <AuthRequestCard
              data={{
                id: formData.id,
                fullName: formData.patient.fullName,
                phone: formData.patient.phone,
                dob: formData.patient.dob,
                notes: formData.notes,
              }}
              onUpdate={(updates) => handleCardUpdate('Request', updates)}
              isEditing={isEditing}
            />
            <Button onClick={() => handleCardUpdate('Request', formData)} className="w-full">
              Update Request
            </Button>
          </div>

          <div className="space-y-4">
            <InsuranceAuthCard
              authNumber={formData.authNumber}
              onUpdate={(value) => handleCardUpdate('Insurance', { authNumber: value })}
              isEditing={isEditing}
            />
            <Button onClick={() => handleCardUpdate('Insurance', { authNumber: formData.authNumber })} className="w-full">
              Update Insurance Auth
            </Button>
          </div>

          <AuditTrailCard entries={formData.auditTrail} />
          
          <div className="space-y-4">
            <NotesCard />
            <Button onClick={() => handleCardUpdate('Notes', { notes: formData.notes })} className="w-full">
              Update Notes
            </Button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveAll}>
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}