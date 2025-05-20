// ** Import Schema
import { z } from "zod";
import { attendanceDetails } from "../data";

const responseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      sl_no: z.number(),
      date: z.string(),
      punch_in: z.string(),
      punch_out: z.string(),
      total_working_hrs: z.string(),
      ot_hours: z.string(),
      status: z.enum([
        "Present",
        "Absent(CL)",
        "Absent(SL)",
        "Absent(EL)",
        "Absent(LOP)",
      ]),
      verification_status: z.enum(["Verified", "Not Verified"]),
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
export async function fetchAttendance() {
  // Simulate async fetch
  const page = 1;
  const limit = attendanceDetails.length;
  const total_items = attendanceDetails.length;
  const total_pages = 1;
  const response = {
    success: true,
    data: attendanceDetails,
    pagination: {
      page,
      limit,
      total_pages,
      total_items,
    },
  };
  return responseSchema.parse(response);
}
