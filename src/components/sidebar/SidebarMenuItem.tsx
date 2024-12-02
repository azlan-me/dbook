import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarMenuItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  isOpen: boolean;
  onClick: () => void;
}

export function SidebarMenuItem({ icon: Icon, label, isActive, isOpen, onClick }: SidebarMenuItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent cursor-pointer",
        isActive ? "bg-accent" : "transparent"
      )}
      onClick={onClick}
    >
      <Icon className={cn(
        "transition-all",
        isOpen ? "h-4 w-4" : "h-6 w-6"
      )} />
      <span className={cn(
        "transition-opacity duration-200 flex-1",
        !isOpen && "opacity-0 hidden"
      )}>
        {label}
      </span>
    </div>
  );
}