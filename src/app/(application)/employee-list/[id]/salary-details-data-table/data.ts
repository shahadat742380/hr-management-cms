export type SalarySlipDetail = {
  id: number;
  sl_no: number;
  payslip_id: string;
  month_year: string;
  generated_date: string;
  net_pay: number;
  status: "Sent" | string; // Using string for potential future statuses
};

export const salaryData: SalarySlipDetail[] = [
  {
    id: 1,
    sl_no: 1,
    payslip_id: "PI000",
    month_year: "MAY 2024",
    generated_date: "06 MAY 2024",
    net_pay: 27681,
    status: "Sent",
  },
  {
    id: 2,
    sl_no: 2,
    payslip_id: "PI001",
    month_year: "JUN 2024",
    generated_date: "06 JUN 2024",
    net_pay: 52477,
    status: "Sent",
  },
  {
    id: 3,
    sl_no: 3,
    payslip_id: "PI002",
    month_year: "JUL 2024",
    generated_date: "06 JUL 2024",
    net_pay: 40139,
    status: "Sent",
  },
  {
    id: 4,
    sl_no: 4,
    payslip_id: "PI003",
    month_year: "AUG 2024",
    generated_date: "06 AUG 2024",
    net_pay: 55475,
    status: "Sent",
  },
  {
    id: 5,
    sl_no: 5,
    payslip_id: "PI004",
    month_year: "SEP 2024",
    generated_date: "06 SEP 2024",
    net_pay: 59578,
    status: "Sent",
  },
  {
    id: 6,
    sl_no: 6,
    payslip_id: "PI005",
    month_year: "OCT 2024",
    generated_date: "06 OCT 2024",
    net_pay: 37068,
    status: "Sent",
  },
  {
    id: 7,
    sl_no: 7,
    payslip_id: "PI006",
    month_year: "NOV 2024",
    generated_date: "06 NOV 2024",
    net_pay: 41647,
    status: "Sent",
  },
  {
    id: 8,
    sl_no: 8,
    payslip_id: "PI007",
    month_year: "DEC 2024",
    generated_date: "06 DEC 2024",
    net_pay: 50776,
    status: "Sent",
  },
  {
    id: 9,
    sl_no: 9,
    payslip_id: "PI008",
    month_year: "JAN 2025",
    generated_date: "06 JAN 2025",
    net_pay: 42849,
    status: "Sent",
  },
  {
    id: 10,
    sl_no: 10,
    payslip_id: "PI009",
    month_year: "FEB 2025",
    generated_date: "06 FEB 2025",
    net_pay: 52373,
    status: "Sent",
  },
];
