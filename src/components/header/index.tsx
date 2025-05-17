// components/header/index.tsx
"use client";

// ** Core React and Next.js imports
import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ** Components
import { Typography } from "@/components/typography";
import { UserNav } from "./user";
import { ThemeToggle } from "@/components/theme-toggle";

// ** Icons

// ** Utils and Config
import { cn } from "@/lib/utils";

import { Menu } from "lucide-react";
import { IcoSidebarLogo } from "@/assets/icons";
import MenuSidebar from "../layout/menu-sidebar";

// ** Types
interface NavItem {
  label: string;
  link: string;
  children?: NavItem[];
  disabled?: boolean;
}

// ** Navigation Data
const navItems: NavItem[] = [
  {
    label: "Dashboard",
    link: "/",
  },
  {
    label: "Employee List",
    link: "/employee-list",
  },
  {
    label: "Payslip Generator",
    link: "#",
  },
 
];

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full shadow-xl ">
        <div className="bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary">
          <div className="container mx-auto section-padding flex  items-center justify-between py-2 md:py-4">
            <div className="flex items-center gap-4">
              <div
                className="cursor-pointer block lg:hidden "
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-8 w-8 text-primary-foreground" />
              </div>
              <IcoSidebarLogo />
            </div>

            {/* Nav links */}
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {navItems.map((item, idx) => {
                  const isActive = usePathname() === item.link;
                  return (
                    <li key={item.label} className="flex items-center">
                      <Link
                        href={item.link}
                        className={cn(
                          "px-6 py-2 font-medium text-primary-foreground",
                          isActive
                            ? "rounded-full bg-primary-foreground/40  font-medium "
                            : " font-medium "
                        )}
                      >
                        {item.label}
                      </Link>
                      {idx < navItems.length - 1 && (
                        <span
                          className="ml-4 h-6 w-px bg-primary-foreground/40"
                          aria-hidden="true"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* User Profile & Theme Toggle */}
            <div
              className="flex items-center justify-end gap-4"
              aria-label="User controls"
            >
              <div className="text-right">
                <Typography
                  variant="Medium_H5"
                  className="block text-primary-foreground"
                >
                  user name
                </Typography>
                <Typography
                  variant="Regular_H7"
                  className="block text-primary-foreground capitalize"
                >
                  user role
                </Typography>
              </div>
              <UserNav />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <MenuSidebar
        navItems={navItems}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}
