import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SubMenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface SidebarSubMenuProps {
  items: SubMenuItem[];
  isOpen: boolean;
  onItemClick: () => void;
}

export function SidebarSubMenu({ items, isOpen, onItemClick }: SidebarSubMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="ml-6 mt-1 space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}