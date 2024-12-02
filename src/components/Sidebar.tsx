import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarContent } from "./sidebar/SidebarContent";
import { SidebarFooter } from "./sidebar/SidebarFooter";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <div className="flex flex-col gap-1">
          <div className="w-4 h-0.5 bg-current"></div>
          <div className="w-4 h-0.5 bg-current"></div>
          <div className="w-4 h-0.5 bg-current"></div>
        </div>
      </Button>

      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-full transition-all duration-300 lg:translate-x-0",
          isOpen ? "w-64" : "w-20",
          !isMobileOpen && "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto glass border-r py-8">
          <SidebarHeader isOpen={isOpen} setIsOpen={setIsOpen} />
          <SidebarContent isOpen={isOpen} setMobileOpen={setIsMobileOpen} />
          <SidebarFooter isOpen={isOpen} />
        </div>
      </div>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}