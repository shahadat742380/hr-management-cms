import { useMemo } from "react";

/**
 * Default export configuration for the attachments data table
 */
export function useExportConfig() {
  // Column mapping for export
  const columnMapping = useMemo(() => {
    return {
      sl_no: "Sl. No.",
      date: "Date",
      punch_in: "Punch In",
      punch_out: "Punch Out",
      total_working_hrs: "Total Working Hours",
      ot_hours: "OT Hours",
      status: "Status",
      verification_status: "Verification Status",
    };
  }, []);

  // Column widths for Excel export
  const columnWidths = useMemo(() => {
    return [
      { wch: 10 }, // Sl. No.
      { wch: 15 }, // Date
      { wch: 15 }, // Punch In
      { wch: 15 }, // Punch Out
      { wch: 20 }, // Total Working Hours
      { wch: 15 }, // OT Hours
      { wch: 15 }, // Status
      { wch: 20 }, // Verification Status
    ];
  }, []);

  // Headers for CSV export
  const headers = useMemo(() => {
    return [
      "sl_no",
      "date",
      "punch_in",
      "punch_out",
      "total_working_hrs",
      "ot_hours",
      "status",
      "verification_status",
    ];
  }, []);

  return {
    columnMapping,
    columnWidths,
    headers,
    entityName: "attendance",
  };
}
