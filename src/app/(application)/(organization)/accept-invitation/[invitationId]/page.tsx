/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { usePathname, useRouter } from "next/navigation";
// ** import core packages
import { useEffect, useState } from "react";

// ** import third party packages

import { Typography } from "@/components/typography";
// ** import  components
import { Button } from "@/components/ui/button";

// ** import auth client instance

const AcceptInvitation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [invitationId, setInvitationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract invitationId from the URL path
  useEffect(() => {
    const pathSegments = pathname.split("/");
    const invitationIdFromPath = pathSegments[2];

    if (!invitationIdFromPath) {
      setError("Invalid invitation link.");
    } else {
      setInvitationId(invitationIdFromPath);
      // Safe localStorage usage
      if (typeof window !== "undefined") {
        localStorage.setItem("invitationId", invitationIdFromPath);
      }
    }

    
  }, [pathname, router]);

  const clearInvitationId = () => {
    // Safe localStorage usage
    if (typeof window !== "undefined") {
      localStorage.removeItem("invitationId");
    }
  };

  // Accept invitation
  const handleAccept = async () => {
  
  };

  // Reject invitation
  const handleReject = async () => {
   
  };

  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <Typography variant="SemiBold_H2" className="mb-4 block text-center text-primary">
          Accept Invitation
        </Typography>
        <Typography variant="Regular_H5" className="mb-6 block text-center">
          You're invited to join an organization. Click below to accept or reject the invitation.
        </Typography>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <div className="flex gap-4">
          <Button
            onClick={handleReject}
            disabled={rejecting}
            variant={"outline"}
            className="w-full border-primary"
          >
            {rejecting ? "Processing..." : "Reject Invitation"}
          </Button>
          <Button onClick={handleAccept} disabled={loading} className="w-full">
            {loading ? "Processing..." : "Accept Invitation"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitation;
