// ** Import Schema
import { z } from "zod";
import { paySlipData } from "../data";

const responseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      id: z.string(),
      payslip_id: z.string(),
      month_year: z.string(),
      generated_date: z.string(),
      generated_type: z.union([z.literal("Auto"), z.literal("Manual")]),
      generated_by: z.string(),
      status: z.union([
        z.literal("Sent"),
        z.literal("Pending"),
        z.literal("Failed"),
      ]),
    })
  ),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total_pages: z.number(),
    total_items: z.number(),
  }),
});

// Infer the response type
export type FetchPayslipResponse = z.infer<typeof responseSchema>;

/**
 * Fetch salary data (mocked)
 */
export async function fetchPayslip(): Promise<FetchPayslipResponse> {
  // Simulate async fetch
  const page = 1;
  const limit = paySlipData.length;
  const total_items = paySlipData.length;
  const total_pages = 1;
  const response = {
    success: true,
    data: paySlipData,
    pagination: {
      page,
      limit,
      total_pages,
      total_items,
    },
  };
  return responseSchema.parse(response);
}
