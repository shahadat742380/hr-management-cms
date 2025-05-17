// ** import core packages
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ** import components
import { Sheet, SheetContent } from "../ui/sheet";
import { DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";

// ** import utils
import { cn } from "@/lib/utils";

// ** import assets
import { IcoSidebarLogo } from "@/assets/icons";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: {
    label: string;
    link: string;
  }[];
}

const MenuSidebar = ({ isOpen, onClose, navItems }: SidebarProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] p-0">
        <DialogTitle></DialogTitle>
        <div className="p-4">
          <IcoSidebarLogo className="text-primary" />
          <Separator className="my-4" />
          <nav className="flex flex-col gap-2">
            <ul className="">
              {navItems.map((item, idx) => {
                const isActive = usePathname() === item.link;
                return (
                  <li key={item.label} className="flex items-center">
                    <Link
                      href={item.link}
                      className={cn(
                        "px-6 py-2 font-medium text-primary w-full",
                        isActive
                          ? "rounded-full bg-primary/20  font-medium "
                          : " font-medium "
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSidebar;
