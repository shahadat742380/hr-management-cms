// Define the type for a payslip data object
export interface PayslipData {
  id: string; // Change id type back to string to match fetch-payslip.ts and column expectations
  payslip_id: string;
  month_year: string;
  generated_date: string;
  generated_type: "Auto" | "Manual"; // Use a union type for known values
  generated_by: string;
  status: "Sent" | "Pending" | "Failed"; // Include 'Failed' as used in other files
}

export const paySlipData: PayslipData[] = [
  {
    id: "PI001", // Change id value back to string to match payslip_id and expected type
    payslip_id: "PI001",
    month_year: "May 2024",
    generated_date: "06 May 2024",
    generated_type: "Auto",
    generated_by: "System",
    status: "Sent",
  },
  {
    id: "PI002", // Change id value back to string
    payslip_id: "PI002",
    month_year: "Jun 2024",
    generated_date: "06 Jun 2024",
    generated_type: "Auto",
    generated_by: "System",
    status: "Sent",
  },
  {
    id: "PI003", // Change id value back to string
    payslip_id: "PI003",
    month_year: "Jul 2024",
    generated_date: "06 Jul 2024",
    generated_type: "Manual",
    generated_by: "Magha Lakshmi, +8",
    status: "Sent",
  },
  {
    id: "PI004", // Change id value back to string
    payslip_id: "PI004",
    month_year: "Aug 2024",
    generated_date: "06 Aug 2024",
    generated_type: "Auto",
    generated_by: "System",
    status: "Sent",
  },
  {
    id: "PI005", // Change id value back to string
    payslip_id: "PI005",
    month_year: "Sep 2024",
    generated_date: "06 Sep 2024",
    generated_type: "Auto",
    generated_by: "System",
    status: "Sent",
  },
  {
    id: "PI006", // Change id value back to string
    payslip_id: "PI006",
    month_year: "Oct 2024",
    generated_date: "06 Oct 2024",
    generated_type: "Auto",
    generated_by: "System",
    status: "Sent",
  },
  {
    id: "PI007", // Change id value back to string
    payslip_id: "PI007",
    month_year: "Nov 2024",
    generated_date: "06 Nov 2024",
    generated_type: "Auto",
    generated_by: "System",
    status: "Sent",
  },
  {
    id: "PI008", // Change id value back to string
    payslip_id: "PI008",
    month_year: "Dec 2024",
    generated_date: "06 Dec 2024",
    generated_type: "Manual",
    generated_by: "Carrie Frazier",
    status: "Sent",
  },
  {
    id: "PI009", // Change id value back to string
    payslip_id: "PI009",
    month_year: "Jan 2025",
    generated_date: "06 Jan 2025",
    generated_type: "Manual",
    generated_by: "Satish, Rajeev",
    status: "Sent",
  },
  {
    id: "PI010", // Change id value back to string
    payslip_id: "PI010",
    month_year: "Feb 2025",
    generated_date: "06 Feb 2025",
    generated_type: "Auto",
    generated_by: "System",
    status: "Sent",
  },
];
