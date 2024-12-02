import { Sidebar } from "@/components/Sidebar";
import { LocationForm } from "@/components/locations/LocationForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddLocation = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log("Adding location:", data);
    // Here you would typically make an API call to create the location
    toast.success("Location added successfully");
    navigate("/locations");
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="p-8">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold">Add Location</h1>
              <p className="text-muted-foreground">
                Create a new location by filling out the form below
              </p>
            </div>

            <LocationForm
              onSubmit={handleSubmit}
              onCancel={() => navigate("/locations")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;