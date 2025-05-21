"use client";

// ** Import 3rd Party Libs
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

// ** Import Components
import { DataTableColumnHeader } from "@/components/data-table/column-header";

// ** Import UI Components
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ** Import Schema

// ** Import Table Row Actions
import { DataTableRowActions } from "./row-actions";
import { cn } from "@/lib/utils";
import { AttendanceDetail } from "../data";
import ChangeStatusDialog from "./actions/change-status-dialog";
import ChangeVerificationStatusDialog from "./actions/change-verification-status-dialog.tsx";

// Define type for attendance status
type AttendanceStatus =
  | "Present"
  | "Absent(CL)"
  | "Absent(SL)"
  | "Absent(EL)"
  | "Absent(LOP)";

// Define status color mapping
const getStatusColor = (status: AttendanceStatus): string => {
  switch (status) {
    case "Present":
      return "bg-status-active text-primary-foreground hover:!bg-status-active/80 hover:!text-primary-foreground";
    case "Absent(CL)":
      return "bg-status-inactive text-primary-foreground hover:!bg-status-inactive/80 hover:!text-primary-foreground";
    case "Absent(SL)":
      return "bg-status-absent-sl text-primary-foreground hover:!bg-status-absent-sl/80 hover:!text-primary-foreground";
    case "Absent(EL)":
      return "bg-status-absent-el text-primary-foreground hover:!bg-status-absent-el/80 hover:!text-primary-foreground";
    case "Absent(LOP)":
      return "bg-status-not-verified text-primary-foreground hover:!bg-status-not-verified/80 hover:!text-primary-foreground";
    default:
      return "bg-primary text-primary-foreground hover:!bg-primary/80 hover:!text-primary-foreground";
  }
};

// Define status color mapping
const getStatusTextColor = (status: AttendanceStatus): string => {
  switch (status) {
    case "Present":
      return "text-status-active";
    case "Absent(CL)":
      return "text-status-inactive ";
    case "Absent(SL)":
      return "text-status-absent-sl ";
    case "Absent(EL)":
      return "text-status-absent-el ";
    case "Absent(LOP)":
      return "text-status-not-verified ";
    default:
      return "text-primary";
  }
};

interface StatusCellProps {
  initialStatus: AttendanceStatus;
  date: string; // Assuming 'date' is available for the dialog fileName
}

const StatusCell: React.FC<StatusCellProps> = ({ initialStatus, date }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<AttendanceStatus>(initialStatus);
  const [pendingStatus, setPendingStatus] = useState<AttendanceStatus | null>(
    null
  );

  const handleStatusChange = (status: AttendanceStatus) => {
    setPendingStatus(status);
    setShowDialog(true);
  };

  const handleConfirmChange = () => {
    if (pendingStatus) {
      // TODO: Implement actual status update logic (e.g., API call)
      setSelectedStatus(pendingStatus);
      setPendingStatus(null);
    }
    setShowDialog(false);
  };

  const handleCancelChange = () => {
    setPendingStatus(null);
    setShowDialog(false);
  };

  // Define the available status options
  const statusOptions: AttendanceStatus[] = [
    "Present",
    "Absent(CL)",
    "Absent(SL)",
    "Absent(EL)",
    "Absent(LOP)",
  ];

  return (
    <div>
      {/* Dialog Component */}
      <ChangeStatusDialog
        open={showDialog}
        onOpenChange={handleCancelChange} // Use handleCancelChange for closing the dialog
        onDelete={handleConfirmChange} // Map onDelete to handleConfirmChange
        fileName={date + " - " + initialStatus} // Provide some context to the dialog
      />

      {/* Status Selector */}
      <Select
        onValueChange={(value) => handleStatusChange(value as AttendanceStatus)}
        value={selectedStatus}
      >
        <SelectTrigger
          className={cn(getStatusColor(selectedStatus), "w-full")}
          iconClassName="text-white opacity-100 size-5"
        >
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem
              key={status}
              value={status}
              className={getStatusTextColor(status)}
              iconClassName={getStatusTextColor(status)}
            >
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Define type for verification status
type VerificationStatus = "Verified" | "Not Verified";

// Define verification status color mapping
const getVerificationStatusColor = (status: VerificationStatus): string => {
  switch (status) {
    case "Verified":
      return "bg-status-active/20 text-status-active hover:!bg-status-active/10 hover:!text-status-active";
    case "Not Verified":
      return "bg-status-not-verified/20 text-status-not-verified hover:status-not-verified/10 hover:!text-status-not-verified";
    default:
      return "bg-primary text-primary-foreground hover:!bg-primary/80 hover:!text-primary-foreground";
  }
};

interface VerificationStatusCellProps {
  initialStatus: VerificationStatus;
  date: string; // Assuming 'date' is available for the dialog fileName
}

const VerificationStatusCell: React.FC<VerificationStatusCellProps> = ({
  initialStatus,
  date,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<VerificationStatus>(initialStatus);
  const [pendingStatus, setPendingStatus] = useState<VerificationStatus | null>(
    null
  );

  const handleStatusChange = (status: VerificationStatus) => {
    setPendingStatus(status);
    setShowDialog(true);
  };

  const handleConfirmChange = () => {
    if (pendingStatus) {
      // TODO: Implement actual verification status update logic (e.g., API call)
      setSelectedStatus(pendingStatus);
      setPendingStatus(null);
    }
    setShowDialog(false);
  };

  const handleCancelChange = () => {
    setPendingStatus(null);
    setShowDialog(false);
  };

  // Define the available status options
  const statusOptions: VerificationStatus[] = ["Verified", "Not Verified"];

  return (
    <div>
      {/* Dialog Component */}
      <ChangeVerificationStatusDialog
        open={showDialog}
        onOpenChange={handleCancelChange} // Use handleCancelChange for closing the dialog
        onDelete={handleConfirmChange} // Map onDelete to handleConfirmChange
        fileName={date + " - " + initialStatus} // Provide some context to the dialog
      />

      {/* Status Selector */}
      <Select
        onValueChange={(value) =>
          handleStatusChange(value as VerificationStatus)
        }
        value={selectedStatus}
      >
        <SelectTrigger
          className={cn(
            getVerificationStatusColor(selectedStatus),
            "w-full rounded-full"
          )}
          iconClassName={cn(
            "opacity-100 size-5",
            selectedStatus === "Verified"
              ? "text-status-active"
              : "text-status-not-verified"
          )}
        >
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent className="!p-0">
          {statusOptions.map((status) => (
            <SelectItem
              key={status}
              value={status}
              className={
                status === "Verified"
                  ? "text-status-active"
                  : "text-status-not-verified"
              }
              iconClassName={cn(
                "truncate",
                status === "Verified"
                  ? "text-status-active"
                  : "text-status-not-verified"
              )}
            >
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const getColumns = (
  handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<AttendanceDetail>[] => {
  // Base columns without the select column
  const baseColumns: ColumnDef<AttendanceDetail>[] = [
    {
      accessorKey: "sl_no",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sl. No." />
      ),
      cell: ({ row }) => (
        <div className="font-medium text-left">{row.getValue("sl_no")}</div>
      ),
      size: 100,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-left">{row.getValue("date")}</div>
      ),
      size: 120,
    },
    {
      accessorKey: "punch_in",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Punch In" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-left flex justify-center">
          {row.getValue("punch_in")}
        </div>
      ),
      size: 140,
    },
    {
      accessorKey: "punch_out",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Punch Out" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-left flex justify-center">
          {row.getValue("punch_out")}
        </div>
      ),
      size: 140,
    },
    {
      accessorKey: "total_working_hrs",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Working Hours" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-left flex justify-center">
          {row.getValue("total_working_hrs")}
        </div>
      ),
      size: 180,
    },
    {
      accessorKey: "ot_hours",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="OT Hours" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-left flex justify-center">
          {row.getValue("ot_hours")}
        </div>
      ),
      size: 140,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const initialStatus = row.getValue("status") as AttendanceStatus;
        const date = row.getValue("date") as string;
        return <StatusCell initialStatus={initialStatus} date={date} />;
      },
      size: 170,
    },
    {
      accessorKey: "verification_status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Verification Status" />
      ),
      cell: ({ row }) => {
        const initialStatus = row.getValue(
          "verification_status"
        ) as VerificationStatus;
        const date = row.getValue("date") as string;
        return (
          <VerificationStatusCell initialStatus={initialStatus} date={date} />
        );
      },
      size: 180,
    },
    {
      id: "view",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="View" />
      ),
      cell: () => {
        return (
          <Button
            size="sm"
            className="bg-primary text-primary-foreground px-5 font-semibold"
          >
            View
          </Button>
        );
      },
      size: 120,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
      size: 80,
    },
  ];

  // Only include the select column if row selection is enabled
  if (handleRowDeselection !== null) {
    return [
      {
        id: "select",
        header: ({ table }) => (
          <div className="pl-2 truncate">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
              className="translate-y-0.5 cursor-pointer"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="truncate">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => {
                if (value) {
                  row.toggleSelected(true);
                } else {
                  row.toggleSelected(false);
                  // If we have a deselection handler, use it for better cross-page tracking
                  if (handleRowDeselection) {
                    handleRowDeselection(row.id);
                  }
                }
              }}
              aria-label="Select row"
              className="translate-y-0.5 cursor-pointer"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 50,
      },
      ...baseColumns,
    ];
  }

  // Return only the base columns if row selection is disabled
  return baseColumns;
};
