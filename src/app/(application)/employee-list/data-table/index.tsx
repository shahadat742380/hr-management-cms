"use client";
// ** imports components
import { DataTable } from "@/components/data-table/data-table";
import { ToolbarOptions } from "./components/toolbar-options";

// ** imports Types & Utils
import { getColumns } from "./components/columns";
import { useExportConfig } from "./utils/config";
import {  useEmployeesData } from "./utils/data-fetching";
import { Employee } from "./dummy-datas";

const EmployeeListTable = () => {
  return (
    <DataTable<Employee, unknown>
      getColumns={getColumns}
      fetchDataFn={useEmployeesData}
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
            name: row.name,
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
        columnResizingTableId: "user-table",
      }}
    />
  );
};

export default EmployeeListTable;
