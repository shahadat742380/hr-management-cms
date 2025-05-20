"use client";
// ** imports components
import { DataTable } from "@/components/data-table/data-table";
import { ToolbarOptions } from "./components/toolbar-options";

// ** imports Types & Utils
import { getColumns } from "./components/columns";
import { useExportConfig } from "./utils/config";
import { useSalaryData } from "./utils/data-fetching";
import { SalarySlipDetail } from "./data";

const SalaryDetailsTable = () => {
  return (
    <DataTable<SalarySlipDetail, unknown>
      getColumns={getColumns}
      fetchDataFn={useSalaryData}
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
            name: row.month_year,
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
        columnResizingTableId: "employee-table",
      }}
    />
  );
};

export default SalaryDetailsTable;
