"use client";

// ** import core package
import * as React from "react";

// ** import third party package
import { TrashIcon } from "@radix-ui/react-icons";
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
import { Member } from "@/types/common";

interface DialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  tasks: Member[];
  showTrigger?: boolean;
  onSuccess?: () => void;
  refetch?: () => void;
}

/**
 * DeleteTasksDialog component renders a dialog for deleting selected members.
 * Prevents deleting oneself and handles feedback on success or error.
 *
 * @param {DialogProps} props - The properties to configure the delete dialog.
 */
export function DeleteMemberPopup({
  tasks = [],
  showTrigger = true,
  onSuccess,
  refetch,
  ...props
}: DialogProps) {
  const { data: session } = authClient.useSession();
  const [isRemovePending, startRemoveTransition] = React.useTransition();

  const handleDelete = async () => {
    if (!session?.user?.id) {
      toast.error("User session not found.");
      return;
    }

    // Check if the current user is in the selected tasks
    const isCurrentUserSelected = tasks.some((task) => task.user.id === session.user.id);

    if (isCurrentUserSelected) {
      toast.error("Please unselect yourself before Removing.");
      return;
    }

    // Proceed with deletion
    startRemoveTransition(async () => {
      try {
        await Promise.all(
          tasks.map((task) => authClient.organization.removeMember({ memberIdOrEmail: task.id })),
        );

        props.onOpenChange?.(false);
        toast.success("Selected users removed successfully.");
        onSuccess?.();
        refetch?.();
      } catch (error) {
        toast.error("Failed to remove selected users.");
        console.error(error);
      }
    });
  };

  return (
    <Dialog {...props}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant="destructive" className="h-8 w-8 p-0" aria-label="Delete task">
            <TrashIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="space-y-4">
        <DialogHeader className="space-y-2">
          <DialogTitle>Delete Members?</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove the selected members?
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
              {isRemovePending ? "Deleting..." : "Continue"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
