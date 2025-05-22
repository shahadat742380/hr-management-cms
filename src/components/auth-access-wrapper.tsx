// app/components/auth-wrapper.tsx

"use client";

// ** import core package
import React, { useEffect } from "react";

// ** import components
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: organizations, isPending } = authClient.useListOrganizations();

  // ** Check organizations and redirect if not available
  useEffect(() => {
    const invitationId = localStorage.getItem("invitationId");
    if (invitationId) {
      router.push(`/accept-invitation/${invitationId}`);
    } else if (!isPending) {
      if (!organizations || organizations.length === 0) {
        router.push("/no-access");
      } else {
        // Set the first organization's slug in localStorage
        const firstOrgSlug = organizations[0].slug;
        const firstOrgID = organizations[0].id;
        localStorage.setItem("currentOrgSlug", firstOrgSlug);
        localStorage.setItem("currentOrgID", firstOrgID);
      }
    }
  }, [organizations, router, isPending]);

  return (
   
      <main className="w-full">
        <Header />
        <div>{children}</div>
        <Toaster richColors position="top-center" visibleToasts={1} />
      </main>
   
  );
};

export default WrapperLayout;
