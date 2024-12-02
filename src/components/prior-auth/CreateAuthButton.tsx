import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CreateAuthButton() {
  const navigate = useNavigate();

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
    <Button onClick={handleCreate}>
      <Plus className="mr-2 h-4 w-4" />
      Create Prior Authorization
    </Button>
  );
}