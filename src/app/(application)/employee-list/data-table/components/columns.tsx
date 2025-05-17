"use client";

// ** Import 3rd Party Libs
import { ColumnDef } from "@tanstack/react-table";

// ** Import Components
import { DataTableColumnHeader } from "@/components/data-table/column-header";

// ** Import UI Components
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

// ** Import Schema
import { Employee } from "../dummy-datas";

// ** Import Table Row Actions
import { DataTableRowActions } from "./row-actions";
import { cn } from "@/lib/utils";

export const getColumns = (
  handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<Employee>[] => {
  // Base columns without the select column
  const baseColumns: ColumnDef<Employee>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sl. No." />
      ),
      cell: ({ row }) => (
        <div className="font-medium text-left">
          {row.getValue("id")}
        </div>
      ),
      size: 100,
    },
    {
      accessorKey: "employeeId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee ID" />
      ),
      cell: ({ row }) => (
        <div className="font-medium text-left">
          {row.getValue("employeeId")}
        </div>
      ),
      size: 120,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-left">{row.getValue("name")}</div>
      ),
      size: 180,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email ID" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-left">{row.getValue("email")}</div>
      ),
      size: 260,
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-left">{row.getValue("role")}</div>
      ),
      size: 200,
    },
    {
      accessorKey: "joinDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Join Date" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-left">{row.getValue("joinDate")}</div>
      ),
      size: 120,
    },
    {
      accessorKey: "efficiency",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Efficiency" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-left flex justify-end">{row.getValue("efficiency")}</div>
      ),
      size: 120,
    },
    {
      accessorKey: "attendance",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Attendance (Present/Leave)"
        />
      ),
      cell: ({ row }) => {
        const attendance = row.getValue("attendance") as {
          presentDays: number;
          leaveDays: number;
        };
        return (
          <div className="truncate text-left flex justify-center ">
            {attendance.presentDays} Days / {attendance.leaveDays} Days
          </div>
        );
      },
      size: 260,
    },
    {
      accessorKey: "monthlySalary",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Monthly Salary ($)" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-left font-medium flex justify-center text-primary">
          {row.getValue("monthlySalary")}
        </div>
      ),
      size: 200,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        let badgeColor =
          status === "Active"
            ? "bg-status-active text-white"
            : "bg-status-inactive text-white";
        return (
          <div
            className={cn(
              badgeColor,
              "w-24 px-2 !text-center py-2 text-sm font-medium"
            )}
          >
            {status}
          </div>
        );
      },
      size: 140,
    },
    {
      id: "view",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="View" />
      ),
      cell: ({ row }) => {
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
