/* eslint-disable react-hooks/rules-of-hooks */
// components/header/index.tsx
"use client";

// ** Core React and Next.js imports
import { Suspense, useEffect, useState } from "react";
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
import { authClient } from "@/lib/auth-client";
import axiosInstance from "@/config/axios";

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
    link: "/auto-payslip-generator",
  },
];

export function Header() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axiosInstance.get("/user/user-org-role");
        if (response.data.success) {
          setUserRole(response.data.data.role);
        } else {
          setUserRole("No Role");
          console.warn("Failed to fetch user role:", response.data.message);
        }
      } catch (error) {
        setUserRole("No Role");
        console.warn("Error fetching user role:", error);
      }
    };
    fetchUserRole();
  }, []);

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
            <Suspense fallback={<div className="h-12" />}>
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {navItems.map((item, idx) => {
                  const isActive =
                    item.label === "Payslip Generator"
                      ? pathname === "/auto-payslip-generator" ||
                        pathname === "/manual-payslip-generator" ||
                        pathname === "/payslip-generation-log"
                      : pathname === item.link;
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
            </Suspense>

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
                   {session?.user?.name}
                </Typography>
                <Typography
                  variant="Regular_H7"
                  className="block text-primary-foreground capitalize"
                >
                  {userRole}
                </Typography>
              </div>
              <UserNav image={session?.user?.image ?? undefined} />
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
