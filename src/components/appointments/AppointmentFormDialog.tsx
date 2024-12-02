import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Shield, Building } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CLINIC_LOCATIONS = [
  "Main Clinic",
  "Downtown Branch",
  "North Side Clinic",
  "South Medical Center",
];

interface AppointmentFormDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AppointmentFormDialog({ open, onClose }: AppointmentFormDialogProps) {
  const [formData, setFormData] = useState({
    patient: {
      fullName: "",
      phone: "",
      dob: "",
      email: "",
      address: "",
      state: "",
      postalCode: "",
    },
    insurance: {
      name: "",
      planName: "",
      planType: "",
      memberId: "",
    },
    appointment: {
      date: "",
      time: "",
      location: "",
      notes: "",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Appointment scheduled successfully");
    onClose();
  };

  const updateField = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Patient Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <Input
                    required
                    value={formData.patient.fullName}
                    onChange={(e) => updateField("patient", "fullName", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone Number</label>
                  <PhoneInput
                    required
                    value={formData.patient.phone}
                    onChange={(e) => updateField("patient", "phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Date of Birth</label>
                  <Input
                    type="date"
                    required
                    value={formData.patient.dob}
                    onChange={(e) => updateField("patient", "dob", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <Input
                    type="email"
                    required
                    value={formData.patient.email}
                    onChange={(e) => updateField("patient", "email", e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-muted-foreground">Address</label>
                  <Input
                    required
                    value={formData.patient.address}
                    onChange={(e) => updateField("patient", "address", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">State</label>
                  <Input
                    required
                    value={formData.patient.state}
                    onChange={(e) => updateField("patient", "state", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Postal Code</label>
                  <Input
                    required
                    value={formData.patient.postalCode}
                    onChange={(e) => updateField("patient", "postalCode", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Insurance Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Insurance Name</label>
                  <Input
                    required
                    value={formData.insurance.name}
                    onChange={(e) => updateField("insurance", "name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Plan Name</label>
                  <Input
                    required
                    value={formData.insurance.planName}
                    onChange={(e) => updateField("insurance", "planName", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Plan Type</label>
                  <Input
                    required
                    value={formData.insurance.planType}
                    onChange={(e) => updateField("insurance", "planType", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Member ID</label>
                  <Input
                    required
                    value={formData.insurance.memberId}
                    onChange={(e) => updateField("insurance", "memberId", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Appointment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Date</label>
                  <Input
                    type="date"
                    required
                    value={formData.appointment.date}
                    onChange={(e) => updateField("appointment", "date", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Time</label>
                  <Input
                    type="time"
                    required
                    value={formData.appointment.time}
                    onChange={(e) => updateField("appointment", "time", e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-muted-foreground">Clinic Location</label>
                  <Select
                    value={formData.appointment.location}
                    onValueChange={(value) => updateField("appointment", "location", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {CLINIC_LOCATIONS.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-muted-foreground">Additional Notes</label>
                  <Textarea
                    value={formData.appointment.notes}
                    onChange={(e) => updateField("appointment", "notes", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Schedule Appointment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}