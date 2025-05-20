"use client";

import { IcoHome } from "@/assets/icons";
// ** import component
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { SidebarNav } from "./_components/sidebar-nav";
import { ChevronRight } from "lucide-react";

const sidebarNavItems = [
  {
    title: "Profile Details",
    href: "/settings",
  },
  {
    title: "Password Update",
    href: "/settings/password-update",
  },
  {
    title: "Brand Settings",
    href: "/settings/brand-settings",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const [activeTitle, setActiveTitle] = useState("Profile Details");

  return (
    <div className="container mx-auto space-y-6 md:p-10 md:pb-16">
      <div className="flex items-center gap-x-2">
        <Link href={"/"}>
          <IcoHome />
        </Link>
        <ChevronRight className="text-muted-foreground" />{" "}
        <p className="text-muted-foreground">Account Details</p>{" "}
        <ChevronRight className="text-primary" />
        <p className="font-medium text-primary">{activeTitle}</p>
      </div>
      <div className="space-y-0.5">
        <h2 className="font-bold text-2xl tracking-tight">Account Details</h2>
        <p className="text-muted-foreground">
          View and manage your personal account information.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} setTitle={setActiveTitle} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
