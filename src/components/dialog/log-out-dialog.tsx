import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeletePatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function LogoutDialog({ open, onOpenChange }: DeletePatientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full p-6">
        <DialogHeader>
          <DialogTitle>  Logout</DialogTitle>
        </DialogHeader>
        <div className="mt-2 text-base text-foreground">
        You are about to logout of the system. Ensure all your changes are saved before
        proceeding.
        </div>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutDialog;