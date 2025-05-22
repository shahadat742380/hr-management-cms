"use client";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client"; // Assuming this is your auth library
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NoAccessPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true); // Start loading state
    try {
      await authClient.signOut();
      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
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
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              Logging out...
            </div>
          ) : (
            "Log out"
          )}
        </Button>
      </div>
    </main>
  );
};

export default NoAccessPage;
