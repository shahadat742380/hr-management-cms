/* eslint-disable react/no-unescaped-entities */
"use client";

import { usePathname, useRouter } from "next/navigation";
// ** import core packages
import { useEffect, useState } from "react";

// ** import third party packages
import { toast } from "sonner";

import { Typography } from "@/components/typography";
// ** import  components
import { Button } from "@/components/ui/button";

// ** import auth client instance
import { authClient } from "@/lib/auth-client";

const AcceptInvitation = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
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

    if (!session) {
      router.push("/sign-in");
    }
  }, [pathname, session, router]);

  const clearInvitationId = () => {
    // Safe localStorage usage
    if (typeof window !== "undefined") {
      localStorage.removeItem("invitationId");
    }
  };

  // Accept invitation
  const handleAccept = async () => {
    if (!invitationId) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await authClient.organization.acceptInvitation({
        invitationId,
      });

      if (error) {
        throw new Error(error.message || "Failed to accept invitation.");
      }

      toast.success("Invitation accepted successfully!");
      clearInvitationId();
      router.push("/"); // Redirect after accepting
    } catch (err) {
      console.error("Error accepting invitation:", err);
      setError("Failed to accept invitation. Please try again.");
      toast.error("Failed to accept invitation.");
    } finally {
      setLoading(false);
    }
  };

  // Reject invitation
  const handleReject = async () => {
    if (!invitationId) return;

    setRejecting(true);
    setError(null);

    try {
      const { error } = await authClient.organization.rejectInvitation({
        invitationId,
      });

      if (error) {
        throw new Error(error.message || "Failed to reject invitation.");
      }

      toast.success("Invitation rejected successfully.");
      clearInvitationId();
      router.push("/"); // Redirect after rejecting
    } catch (err) {
      console.error("Error rejecting invitation:", err);
      setError("Failed to reject invitation. Please try again.");
      toast.error("Failed to reject invitation.");
    } finally {
      setRejecting(false);
    }
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
