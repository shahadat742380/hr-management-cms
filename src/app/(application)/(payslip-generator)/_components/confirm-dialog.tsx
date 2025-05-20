import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

function ConfirmDialog({ open, onOpenChange, onConfirm }: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full p-6">
        <DialogHeader>
          <DialogTitle className="text-primary">
            Confirm Auto Payslip Generation
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2 text-base text-foreground">
          Payslips have been successfully generated and sent to the selected
          employees.
        </div>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              No, Review
            </Button>
          </DialogClose>
          <Button onClick={onConfirm}>Yes, Proceed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;
