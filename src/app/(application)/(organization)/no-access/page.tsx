/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NoAccessPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
   console.log("logout successfully!")
    
  };
  return (
    <main className="flex h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <Typography variant="SemiBold_H2" className="mb-4 block text-center text-primary">
          No Access
        </Typography>
        <Typography variant="Regular_H5" className="mb-6 block text-center">
          It seems you don’t have access to any organizations yet. Please contact your administrator
          or try logging out and signing in again.
        </Typography>

        <Button variant="default" className="w-full" onClick={logout} disabled={isLoading}>
          {isLoading ? "Logging out..." : "Log out"}
        </Button>
      </div>
    </main>
  );
};

export default NoAccessPage;
