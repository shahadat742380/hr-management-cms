import { useQuery, keepPreviousData } from "@tanstack/react-query";

// ** Import API

// ** Import Utils
import { preprocessSearch } from "@/components/data-table/utils";
import { fetchSalary } from "./fetch-salary";

/**
 * Hook to fetch employees with the current filters and pagination
 */
export function useSalaryData(
  page: number,
  pageSize: number,
  search: string,
  dateRange: { from_date: string; to_date: string },
  sortBy: string,
  sortOrder: string
) {
  return useQuery({
    queryKey: [
      "salary",
      page,
      pageSize,
      preprocessSearch(search),
      dateRange,
      sortBy,
      sortOrder,
    ],
    queryFn: () => fetchSalary(),
    placeholderData: keepPreviousData, // Keep previous data when fetching new data. If skeleton animation is needed when fetching data, comment this out.
  });
}

// Add a property to the function so we can use it with the DataTable component
useSalaryData.isQueryHook = true;
