import { useMemo } from "react";

/**
 * Default export configuration for the salary details data table
 */
export function useExportConfig() {
  // Column mapping for export
  const columnMapping = useMemo(() => {
    return {
      id: "ID",
      sl_no: "Sl. No.",
      payslip_id: "Payslip ID",
      month_year: "Month/Year",
      generated_date: "Generated Date",
      net_pay: "Net Pay",
      status: "Status",
    };
  }, []);

  // Column widths for Excel export
  const columnWidths = useMemo(() => {
    return [
      { wch: 10 }, // ID
      { wch: 10 }, // Sl. No.
      { wch: 15 }, // Payslip ID
      { wch: 15 }, // Month/Year
      { wch: 20 }, // Generated Date
      { wch: 15 }, // Net Pay
      { wch: 15 }, // Status
    ];
  }, []);

  // Headers for CSV export
  const headers = useMemo(() => {
    return [
      "id",
      "sl_no",
      "payslip_id",
      "month_year",
      "generated_date",
      "net_pay",
      "status",
    ];
  }, []);

  return {
    columnMapping,
    columnWidths,
    headers,
    entityName: "by id",
  };
}
