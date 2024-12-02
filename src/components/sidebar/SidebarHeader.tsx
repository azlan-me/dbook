import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function SidebarHeader({ isOpen, setIsOpen }: SidebarHeaderProps) {
  return (
    <div className="mb-8 px-6 flex items-center justify-between">
      <h2 className={cn(
        "text-2xl font-bold text-primary transition-opacity duration-200",
        !isOpen && "opacity-0"
      )}>
        Tooth Tide
      </h2>
      <Button
        variant="ghost"
        size="icon"
        className="hidden lg:flex"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}