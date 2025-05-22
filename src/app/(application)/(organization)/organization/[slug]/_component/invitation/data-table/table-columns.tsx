/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import core package
import { useState } from "react";

// import third party package
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from "@/components/org-data-table/data-table-column-header";
// import component
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CancelInvitationPopup from "../modal/cancel-invitation-popup";

// import libs
import { formatDateTime } from "@/lib/utils";

// import types
import { Invitation } from "@/types/common";

// Define the type for the meta property
interface ColumnMeta {
  mutate?: () => void;
}

// Extend the ColumnDef type to include the meta property
export type CustomColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  meta?: ColumnMeta; // Add the strongly-typed meta
};

const ActionCell: React.FC<{
  id: string;
  isOwner?: boolean;
  isAdmin?: boolean;
  refetch?: () => void;
}> = ({ id, isOwner, isAdmin, refetch }) => {
  const [showRemove, setShowRemove] = useState(false);
  const handleRefetch = refetch || (() => {});

  return (
    <>
      {showRemove && (
        <Dialog modal onOpenChange={setShowRemove} open={showRemove}>
          <CancelInvitationPopup
            id={id}
            setClose={() => setShowRemove(false)}
            refetch={handleRefetch}
          />
        </Dialog>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={!isAdmin && !isOwner}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowRemove(true)}>Cancel Invitation</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const InvitationTableColumns: CustomColumnDef<Invitation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <div className="lowercase">{row.original.email}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.role}</div>;
    },
  },
  {
    accessorKey: "expiresAt",
    header: "Expires At",
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap capitalize">
          {formatDateTime(row.getValue("expiresAt")) || "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("status")}</div>;
    },
  },

  {
    id: "action",
    header: "Action",
    cell: ({ row, column }) => {
      // TanStack Table v8 stores custom meta on column.columnDef.meta
      const { mutate } = (column.columnDef as CustomColumnDef<Invitation>).meta || {};

      return (
        <ActionCell
          id={row.original.id}
          isOwner={row.original.isOwner}
          isAdmin={row.original.isAdmin}
          refetch={mutate}
        />
      );
    },
  },
];
