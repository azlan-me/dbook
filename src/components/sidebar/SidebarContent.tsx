import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  Settings,
  Home,
  UserPlus,
  UserCog,
  MapPin,
  FileText,
} from "lucide-react";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarSubMenu } from "./SidebarSubMenu";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Calendar, label: "Appointments", path: "/appointments" },
  { icon: Users, label: "Patients", path: "/patients" },
  {
    icon: UserCog,
    label: "Manage Users",
    path: "/manage-users",
    subItems: [
      { icon: UserPlus, label: "Create User", path: "/manage-users/create" },
    ],
  },
  { icon: MapPin, label: "Locations", path: "/locations" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: FileText, label: "Prior Authorizations", path: "/prior-auth" },
];

interface SidebarContentProps {
  isOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function SidebarContent({ isOpen, setMobileOpen }: SidebarContentProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="flex-1 space-y-1 px-3">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isExpanded = expandedItem === item.path;

        return (
          <div key={item.path}>
            <SidebarMenuItem
              icon={item.icon}
              label={item.label}
              isActive={isActive}
              isOpen={isOpen}
              onClick={() => {
                navigate(item.path);
                if (hasSubItems) {
                  setExpandedItem(expandedItem === item.path ? null : item.path);
                }
                setMobileOpen(false);
              }}
            />

            {hasSubItems && (
              <SidebarSubMenu
                items={item.subItems}
                isOpen={isOpen && isExpanded}
                onItemClick={() => setMobileOpen(false)}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}