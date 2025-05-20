"use client";

// ** Import 3rd Party Libs
import { ColumnDef } from "@tanstack/react-table";

// ** Import Components
import { DataTableColumnHeader } from "@/components/data-table/column-header";

// ** Import UI Components
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// ** Import Schema

// ** Import Table Row Actions
import { DataTableRowActions } from "./row-actions";
import { cn } from "@/lib/utils";
import { SalarySlipDetail } from "../data";

export const getColumns = (
  handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<SalarySlipDetail>[] => {
  // Base columns without the select column
  const baseColumns: ColumnDef<SalarySlipDetail>[] = [
   
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
      accessorKey: "payslip_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Payslip ID" />
      ),
      cell: ({ row }) => (
        <div className="font-medium text-left">
          {row.getValue("payslip_id")}
        </div>
      ),
      size: 150,
    },
    {
      accessorKey: "month_year",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Month/Year" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-left">{row.getValue("month_year")}</div>
      ),
      size: 120,
    },
    {
      accessorKey: "generated_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Generated Date" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-left">
          {row.getValue("generated_date")}
        </div>
      ),
      size: 150,
    },
    {
      accessorKey: "net_pay",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Net Pay (₹)" />
      ),
      cell: ({ row }) => (
        <div className="truncate text-center font-medium text-primary">
          {row.getValue("net_pay")}
        </div>
      ),
      size: 120,
    },
    {
      id: "payslip",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Payslip" />
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
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const badgeColor =
          status === "Sent"
            ? "bg-status-active text-white"
            : "bg-status-inactive  text-white"; // Default color for other statuses
        return (
          <Button
            size="sm"
            className={cn(" px-5 font-semibold", badgeColor)}
          >
            {status}
          </Button>
        );
      },
      size: 100,
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
