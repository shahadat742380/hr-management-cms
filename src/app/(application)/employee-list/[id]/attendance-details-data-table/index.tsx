"use client";
// ** imports components
import { DataTable } from "@/components/data-table/data-table";
import { ToolbarOptions } from "./components/toolbar-options";

// ** imports Types & Utils
import { getColumns } from "./components/columns";
import { useExportConfig } from "./utils/config";
import { useAttendance } from "./utils/data-fetching";
import { AttendanceDetail } from "./data";

const AttachmentDetails = () => {
  return (
    <DataTable<AttendanceDetail, unknown>
      getColumns={getColumns}
      fetchDataFn={useAttendance}
      exportConfig={useExportConfig()}
      idField="id"
      pageSizeOptions={[10, 20, 30, 40, 50, 100, 150]}
      renderToolbarContent={({
        selectedRows,
        allSelectedIds,
        totalSelectedCount,
        resetSelection,
      }) => (
        <ToolbarOptions
          selectedUsers={selectedRows.map((row) => ({
            id: row.id,
            name: row.date,
          }))}
          allSelectedUserIds={allSelectedIds}
          totalSelectedCount={totalSelectedCount}
          resetSelection={resetSelection}
        />
      )}
      config={{
        enableRowSelection: true,
        enableClickRowSelect: false,
        enableKeyboardNavigation: true,
        enableSearch: true,
        enableDateFilter: true,
        enableColumnVisibility: true,
        enableUrlState: true,
        size: "default",
        columnResizingTableId: "attendance-table",
      }}
    />
  );
};

export default AttachmentDetails;
