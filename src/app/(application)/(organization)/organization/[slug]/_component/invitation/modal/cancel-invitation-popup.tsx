"use client";

// ** import core package
import { Dispatch, FC, SetStateAction, useState } from "react";

// ** import third party package
import { toast } from "sonner";

// Components
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Auth client
import { authClient } from "@/lib/auth-client";

// Types
interface PopupProps {
  setClose: Dispatch<SetStateAction<boolean>>;
  id: string;
  refetch: () => void;
}

const CancelInvitationPopup: FC<PopupProps> = ({ setClose, id, refetch }) => {
  const [loading, setLoading] = useState(false);

  // Cancel invitation
  const handleCancelInvitation = async () => {
    try {
      setLoading(true);
      await authClient.organization.cancelInvitation({ invitationId: id });
      setLoading(false);
      toast.success("Invitation canceled successfully!");
      refetch();
    } catch (error) {
      console.error("Error canceling invitation:", error);
      toast.error("Failed to cancel the invitation.");
    }
  };

  return (
    <DialogContent className="max-w-md">
      {/* Dialog Header */}
      <DialogHeader>
        <DialogTitle className="font-bold text-primary md:text-xl">Are you sure?</DialogTitle>
        <DialogDescription>
          <Typography variant="Medium_H5" className="block text-hills-gray">
            This action cannot be undone. Removing this member will revoke their access to the
            organization.
          </Typography>
        </DialogDescription>
      </DialogHeader>

      {/* Dialog Footer */}
      <DialogFooter className="flex items-center justify-end">
        <div className="flex items-center gap-6">
          <Button onClick={() => setClose(false)} variant="outline" className="md:text-base">
            Cancel
          </Button>
          <Button
            onClick={handleCancelInvitation}
            className="md:text-base"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Canceling..." : "Continue"}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default CancelInvitationPopup;
