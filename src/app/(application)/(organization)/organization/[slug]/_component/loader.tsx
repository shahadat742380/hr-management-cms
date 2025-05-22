// ** import component
import { DataTableSkeleton } from "@/components/org-data-table/data-table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Loader = () => {
  return (
    <div className="container mx-auto py-10 section-padding">
      <Skeleton className="mr-auto mb-4 h-7 w-56 sm:w-60" />
      <div className="mb-2 flex items-center justify-between">
        <Skeleton className="mr-auto h-7 w-56 sm:w-60" />
        <div className="flex w-full items-center justify-end space-x-2 overflow-auto p-1">
          <Skeleton className="h-7 w-20" />
        </div>
      </div>
      <DataTableSkeleton
        columnCount={5}
        cellWidths={["10rem", "20rem", "12rem", "12rem", "8rem"]}
        shrinkZero
      />
    </div>
  );
};

export default Loader;
