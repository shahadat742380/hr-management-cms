"use client";

import React, { useState } from "react";

// ** import components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SvgChecklist } from "@/assets/svg";
import { Typography } from "@/components/typography";
import { Checkbox } from "@/components/ui/checkbox";
import ConfirmDialog from "./confirm-dialog";
import SuccessfulDialog from "./successful-dialog";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CheckPayslipGenerationDialog = ({ open, onOpenChange }: DialogProps) => {
  const [checklist, setChecklist] = useState({
    punch_times_verified: false,
    overtime_calculations_checked: false,
    leave_approvals_confirmed: false,
    attendance_details_reviewed: false,
  });

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isSuccessfulDialogOpen, setIsSuccessfulDialogOpen] = useState(false);

  const handleCheckboxChange = (
    item: keyof typeof checklist,
    checked: boolean
  ) => {
    setChecklist((prev) => ({ ...prev, [item]: checked }));
  };

  const handleGenerateClick = () => {
    console.log("Checklist status:", checklist);
    // TODO: Add actual payslip generation logic here
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmProceed = () => {
    setIsConfirmDialogOpen(false);
    setIsSuccessfulDialogOpen(true);
  };

  const allChecked = Object.values(checklist).every(Boolean);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-3xl overflow-hidden p-6 sm:p-8 ">
        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle>Final Check Before Payslip Generation</DialogTitle>
        </DialogHeader>

        <Separator orientation="horizontal" />

        <ScrollArea className="h-[70vh]">
          <div className="my-8 max-w-lg mx-auto space-y-4">
            <div className="flex justify-center">
              <SvgChecklist />
            </div>
            <div className="text-center space-y-2">
              <Typography variant="Bold_H3" className="text-primary">
                Final Review Before Payslip
              </Typography>
              <Typography
                variant="Regular_P"
                className="text-muted-foreground text-sm"
              >
                Please confirm all records are verified. Once payslips are
                generated, changes cannot be made.
              </Typography>
            </div>
            <div className="space-y-4">
              <Typography variant="Medium_H4" className="text-primary">
                Checklist Items (Tick to Proceed):
              </Typography>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="punch_times_verified"
                    checked={checklist.punch_times_verified}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "punch_times_verified",
                        checked as boolean
                      )
                    }
                    className="border-primary"
                  />
                  <label
                    htmlFor="punch_times_verified"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have verified all Punch-In & Punch-Out times.
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="overtime_calculations_checked"
                    checked={checklist.overtime_calculations_checked}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "overtime_calculations_checked",
                        checked as boolean
                      )
                    }
                    className="border-primary"
                  />
                  <label
                    htmlFor="overtime_calculations_checked"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have checked Overtime (OT) calculations.
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="leave_approvals_confirmed"
                    checked={checklist.leave_approvals_confirmed}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "leave_approvals_confirmed",
                        checked as boolean
                      )
                    }
                    className="border-primary"
                  />
                  <label
                    htmlFor="leave_approvals_confirmed"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have confirmed Leave approvals (CL, SL, EL, LOP).
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="attendance_details_reviewed"
                    checked={checklist.attendance_details_reviewed}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "attendance_details_reviewed",
                        checked as boolean
                      )
                    }
                    className="border-primary"
                  />
                  <label
                    htmlFor="attendance_details_reviewed"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have reviewed the Attendance Details for all employees.
                  </label>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <Separator orientation="horizontal" />

        {/* Footer */}
        <DialogFooter className="mt-2 flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Go Back
            </Button>
          </DialogClose>
          <Button onClick={handleGenerateClick} disabled={!allChecked}>
            Generate Payslips
          </Button>
        </DialogFooter>
      </DialogContent>
      <ConfirmDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        onConfirm={handleConfirmProceed}
      />
      <SuccessfulDialog
        open={isSuccessfulDialogOpen}
        onOpenChange={setIsSuccessfulDialogOpen}
      />
    </Dialog>
  );
};

export default CheckPayslipGenerationDialog;
