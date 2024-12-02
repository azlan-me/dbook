import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  isOpen: boolean;
}

export function SidebarFooter({ isOpen }: SidebarFooterProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account",
    });
    navigate('/login');
  };

  return (
    <div className="px-3 mt-auto">
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={handleLogout}
      >
        <LogOut className={cn(
          "transition-all mr-2",
          isOpen ? "h-4 w-4" : "h-6 w-6"
        )} />
        <span className={cn(
          "transition-opacity duration-200",
          !isOpen && "opacity-0 hidden"
        )}>
          Logout
        </span>
      </Button>
    </div>
  );
}