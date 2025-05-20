import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
  onDelete: () => void;
}

const DeleteFileDialog = ({ open, onOpenChange, fileName, onDelete }: DeleteFileDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full p-6">
        <DialogHeader>
          <DialogTitle>Delete file?</DialogTitle>
        </DialogHeader>
        <div className="mt-2 text-base text-foreground">
          Are you sure you want to delete the{' '}
          <span className="text-primary font-medium">&quot;{fileName}&quot;</span> File?
        </div>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button  onClick={onDelete} type="button">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFileDialog;