// ** Import Schema
import { z } from "zod";
import { salaryData } from "../data";

const responseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      id: z.number(),
      sl_no: z.number(),
      payslip_id: z.string(),
      month_year: z.string(),
      generated_date: z.string(),
      net_pay: z.number(),
      status: z.string(),
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
 * Fetch salary data (mocked)
 */
export async function fetchSalary() {
  // Simulate async fetch
  const page = 1;
  const limit = salaryData.length;
  const total_items = salaryData.length;
  const total_pages = 1;
  const response = {
    success: true,
    data: salaryData,
    pagination: {
      page,
      limit,
      total_pages,
      total_items,
    },
  };
  return responseSchema.parse(response);
}
