// ** import core packages
import { useState } from "react";

// import third party package
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import ConfirmDialog from "../modal/change-role-popup";
import RemoveMemberPopup from "../modal/remove-member-popup";

// import types
import { Member, MemberRole } from "@/types/common";

// Define the type for the meta property
interface ColumnMeta {
  mutate?: () => void;
}

// Extend the ColumnDef type to include the meta property
export type CustomColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  meta?: ColumnMeta; // Add the strongly-typed meta
};

interface RoleSelectProps {
  value: MemberRole;
  isOwner: boolean;
  id: string;
  refetch?: () => void;
  isCurrentUser: boolean;
}

const ActionCell: React.FC<{
  id: string;
  isOwner?: boolean;
  refetch?: () => void;
  isCurrentUser: boolean;
}> = ({ id, isOwner, refetch, isCurrentUser }) => {
  const [showRemove, setShowRemove] = useState(false);
  const handleRefetch = refetch || (() => {});

  return (
    <>
      {showRemove && (
        <Dialog modal onOpenChange={setShowRemove} open={showRemove}>
          <RemoveMemberPopup
            id={id}
            setClose={() => setShowRemove(false)}
            refetch={handleRefetch}
          />
        </Dialog>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={!isOwner || isCurrentUser}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowRemove(true)}>Remove</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const RoleSelect: React.FC<RoleSelectProps> = ({
  value,
  isOwner: disabled,
  id,
  refetch,
  isCurrentUser,
}) => {
  const [selectedRole, setSelectedRole] = useState<MemberRole>(value);
  const [pendingRole, setPendingRole] = useState<MemberRole | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRefetch = refetch || (() => {});

  const handleRoleChange = (newRole: MemberRole) => {
    setPendingRole(newRole);
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingRole) return;

    try {
      await authClient.organization.updateMemberRole({
        memberId: id,
        role: pendingRole,
      });

      setSelectedRole(pendingRole);
      toast.success("Member role updated successfully!");
      handleRefetch();
    } catch (error) {
      console.log("Error updating role:", error);
      toast.error("Failed to update member role.");
    } finally {
      setIsDialogOpen(false);
      setPendingRole(null);
    }
  };

  return (
    <>
      <Select
        value={selectedRole}
        disabled={disabled || isCurrentUser}
        onValueChange={handleRoleChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="owner">Owner</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="member">Member</SelectItem>
        </SelectContent>
      </Select>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={isDialogOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export const MemberTableColumns: CustomColumnDef<Member>[] = [
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
    accessorKey: "name",
    id: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div className="capitalize">{row.original.user.name}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row, column }) => {
      // TanStack Table v8 stores custom meta on column.columnDef.meta
      const { mutate } = (column.columnDef as CustomColumnDef<Member>).meta || {};

      const { data: session } = authClient.useSession();
      const isCurrentUser = session?.user?.id === row.original.user.id;

      return (
        <div className="w-28">
          <RoleSelect
            value={row.getValue("role")}
            isOwner={!row.original.isOwner}
            id={row.original.id}
            refetch={mutate}
            isCurrentUser={isCurrentUser || false}
          />
        </div>
      );
    },
  },

  {
    id: "action",
    header: "Action",
    cell: ({ row, column }) => {
      // TanStack Table v8 stores custom meta on column.columnDef.meta
      const { mutate } = (column.columnDef as CustomColumnDef<Member>).meta || {};

      const { data: session } = authClient.useSession();
      const isCurrentUser = session?.user?.id === row.original.user.id;

      return (
        <ActionCell
          id={row.original.id}
          isOwner={row.original.isOwner}
          refetch={mutate}
          isCurrentUser={isCurrentUser || false}
        />
      );
    },
  },
];
