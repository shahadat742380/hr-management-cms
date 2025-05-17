// ** Import Schema
import { z } from "zod";
import { employees } from "../dummy-datas";

const responseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      id: z.number(),
      employeeId: z.string(),
      name: z.string(),
      email: z.string(),
      role: z.string(),
      joinDate: z.string(),
      efficiency: z.string(),
      attendance: z.object({
        presentDays: z.number(),
        leaveDays: z.number(),
      }),
      monthlySalary: z.number(),
      status: z.enum(["Active", "Inactive"]),
    })
  ),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total_pages: z.number(),
    total_items: z.number(),
  }),
});

/**
 * Fetch employees (mocked)
 */
export async function fetchEmployees() {
  // Simulate async fetch
  const page = 1;
  const limit = employees.length;
  const total_items = employees.length;
  const total_pages = 1;
  const response = {
    success: true,
    data: employees,
    pagination: {
      page,
      limit,
      total_pages,
      total_items,
    },
  };
  return responseSchema.parse(response);
}
