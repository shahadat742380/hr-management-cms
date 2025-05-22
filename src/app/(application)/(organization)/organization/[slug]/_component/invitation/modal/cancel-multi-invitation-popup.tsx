"use client";

// ** import core package
import * as React from "react";

// ** import third party package
import { toast } from "sonner";

// ** import Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// ** Auth client
import { authClient } from "@/lib/auth-client";

// ** import types
import { Invitation } from "@/types/common";

interface DialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  tasks: Invitation[];
  showTrigger?: boolean;
  onSuccess?: () => void;
  refetch?: () => void;
}

/**
 * DeleteTasksDialog component renders a dialog for deleting selected members.
 * Prevents deleting oneself and handles feedback on success or error.
 *
 * @param {CancelMultiInvitationPopup} props - The properties to configure the delete dialog.
 */
export function CancelMultiInvitationPopup({
  tasks = [],
  showTrigger = true,
  onSuccess,
  refetch,
  ...props
}: DialogProps) {
  const [isRemovePending, startCancelTransition] = React.useTransition();

  const handleDelete = async () => {
    // Proceed with deletion
    startCancelTransition(async () => {
      try {
        await Promise.all(
          tasks.map((task) => authClient.organization.cancelInvitation({ invitationId: task.id })),
        );

        props.onOpenChange?.(false);
        toast.success("Invitation canceled successfully!");
        onSuccess?.();
        refetch?.();
      } catch (error) {
        toast.error("Failed to cancel the invitation.");
        console.error(error);
      }
    });
  };

  return (
    <Dialog {...props}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant="destructive" aria-label="Delete task">
            Cancel Invitation
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="space-y-4">
        <DialogHeader className="space-y-2">
          <DialogTitle>Cancel Invitations?</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel invitation the selected members?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="!gap-4 flex flex-col items-center sm:flex-row sm:justify-end sm:space-x-2">
            <DialogClose asChild>
              <Button className="w-full sm:w-auto" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              aria-label="Delete selected task"
              variant="default"
              className="w-full sm:w-auto"
              disabled={isRemovePending}
              onClick={handleDelete}
            >
              {isRemovePending ? "Canceling..." : "Continue"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
