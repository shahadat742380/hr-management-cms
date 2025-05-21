"use client";

import * as React from "react";

// ** Import Icons
import { CirclePlus, TrashIcon } from "lucide-react";

// ** Import UI Components
import { Button } from "@/components/ui/button";
import DeleteFileDialog from "./actions/delete-file-dialog";
import AddEmployeeDialog from "./actions/add-employee-dialog";



// ** Import Actions

interface ToolbarOptionsProps {
  // Current page selected users with name data
  selectedUsers: { id: number; name: string }[];
  // All selected user IDs across all pages (for operations that only need IDs)
  allSelectedUserIds?: (string | number)[];
  // Total count of selected items across all pages
  totalSelectedCount: number;
  resetSelection: () => void;
}

export const ToolbarOptions = ({
  selectedUsers,
  allSelectedUserIds = [],
  totalSelectedCount,
  resetSelection,
}: ToolbarOptionsProps) => {
  const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] =
    React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  // Use total selected count if available, otherwise fall back to current page selection
  const selectionCount = totalSelectedCount || selectedUsers.length;

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => {
          console.log("Add New button clicked");
          setAddEmployeeDialogOpen(true);
        }}
      >
        <CirclePlus className="mr-2 size-4" /> Add New
      </Button>

      {selectionCount > 0 && (
        <>
          <Button
            variant="outline"
            size="default"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({selectionCount})
          </Button>

          <DeleteFileDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            fileName={"Employee List"}
            onDelete={() => {
              setDeleteDialogOpen(false);
              // Optionally: handle file removal here
            }}
          />
        </>
      )}
      <AddEmployeeDialog
        open={addEmployeeDialogOpen}
        onOpenChange={setAddEmployeeDialogOpen}
      />
    </div>
  );
};
