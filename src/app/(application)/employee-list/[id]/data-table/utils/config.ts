import { useMemo } from "react";

/**
 * Default export configuration for the attachments data table
 */
export function useExportConfig() {
  // Column mapping for export
  const columnMapping = useMemo(() => {
    return {
      id: "ID",
      fileName: "File Name",
      date: "Date",
      type: "Type",
      status: "Status"
    };
  }, []);
  
  // Column widths for Excel export
  const columnWidths = useMemo(() => {
    return [
      { wch: 10 }, // ID
      { wch: 30 }, // File Name
      { wch: 15 }, // Date
      { wch: 18 }, // Type
      { wch: 15 }  // Status
    ];
  }, []);
  
  // Headers for CSV export
  const headers = useMemo(() => {
    return [
      "id",
      "fileName",
      "date",
      "type",
      "status"
    ];
  }, []);

  return {
    columnMapping,
    columnWidths,
    headers,
    entityName: "employee"
  };
} 