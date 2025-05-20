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
    title: "Auto Payslip Generator",
    href: "/auto-payslip-generator",
  },
  {
    title: "Manual Payslip Generator",
    href: "/manual-payslip-generator",
  },
  {
    title: "Payslip Generation Log",
    href: "/payslip-generation-log",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const [activeTitle, setActiveTitle] = useState("Profile Details");

  return (
    <div className="container mx-auto space-y-6 md:py-10 section-padding">
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
      {/* container */}
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 ">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} setTitle={setActiveTitle} />
        </aside>
        {/* children container */}
        <div className="flex-1 max-w-5xl">{children}</div>
      </div>
    </div>
  );
}
