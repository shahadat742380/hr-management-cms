"use client";

// ** Third-party components
import { Dispatch, FC, SetStateAction, useState } from "react";

// ** import third party package
import { toast } from "sonner";

// ** import Components
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

const RemoveMemberPopup: FC<PopupProps> = ({ setClose, id, refetch }) => {
  const [loading, setLoading] = useState(false);

  const handleRemoveMember = async () => {
    try {
      setLoading(true);
      await authClient.organization.removeMember({
        memberIdOrEmail: id,
      });

      setLoading(false);
      refetch();
      toast.success("Member removed successfully!");
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error("Failed to remove member.");
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
          <Button onClick={() => setClose(false)} variant="secondary" className="md:text-base">
            Cancel
          </Button>
          <Button
            onClick={handleRemoveMember}
            className="md:text-base"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default RemoveMemberPopup;
