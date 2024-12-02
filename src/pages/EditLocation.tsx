import { Sidebar } from "@/components/Sidebar";
import { LocationForm } from "@/components/locations/LocationForm";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditLocation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - replace with actual API call
  const mockLocation = {
    name: "Main Clinic",
    address: "123 Main St",
    city: "Los Angeles",
    state: "CA",
    postalCode: "90001",
    phone: "(555) 555-5555",
    taxId: "123456789",
    groupNpi: "987654321",
  };

  const handleSubmit = (data: any) => {
    console.log("Updating location:", data);
    // Here you would typically make an API call to update the location
    toast.success("Location updated successfully");
    navigate("/locations");
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="p-8">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold">Edit Location</h1>
              <p className="text-muted-foreground">
                Update location information using the form below
              </p>
            </div>

            <LocationForm
              initialData={mockLocation}
              onSubmit={handleSubmit}
              onCancel={() => navigate("/locations")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLocation;