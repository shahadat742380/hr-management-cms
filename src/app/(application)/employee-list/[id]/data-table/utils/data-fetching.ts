import { useQuery, keepPreviousData } from "@tanstack/react-query";

// ** Import API

// ** Import Utils
import { preprocessSearch } from "@/components/data-table/utils";
import { fetchEmployees } from "./ferch-attachments";

/**
 * Hook to fetch employees with the current filters and pagination
 */
export function useEmployeesData(
  page: number,
  pageSize: number,
  search: string,
  dateRange: { from_date: string; to_date: string },
  sortBy: string,
  sortOrder: string
) {
  return useQuery({
    queryKey: [
      "employee",
      page,
      pageSize,
      preprocessSearch(search),
      dateRange,
      sortBy,
      sortOrder,
    ],
    queryFn: () => fetchEmployees(),
    placeholderData: keepPreviousData, // Keep previous data when fetching new data. If skeleton animation is needed when fetching data, comment this out.
  });
}

// Add a property to the function so we can use it with the DataTable component
useEmployeesData.isQueryHook = true;
