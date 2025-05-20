export type AttendanceDetail = {
  id: number;
  sl_no: number;
  date: string;
  punch_in: string;
  punch_out: string;
  total_working_hrs: string;
  ot_hours: string;
  status:
    | "Present"
    | "Absent(CL)"
    | "Absent(SL)"
    | "Absent(EL)"
    | "Absent(LOP)";
  verification_status: "Verified" | "Not Verified";
};

export const attendanceDetails: AttendanceDetail[] = [
  {
    id: 1,
    sl_no: 1,
    date: "01 May 2024",
    punch_in: "09:27 AM",
    punch_out: "07:38 PM",
    total_working_hrs: "10 hrs 11 mins",
    ot_hours: "1 hr 11 mins",
    status: "Present",
    verification_status: "Verified",
  },
  {
    id: 2,
    sl_no: 2,
    date: "02 May 2024",
    punch_in: "10:47 AM",
    punch_out: "06:29 PM",
    total_working_hrs: "7 hrs 42 mins",
    ot_hours: "0 hrs 0 mins",
    status: "Present",
    verification_status: "Verified",
  },
  {
    id: 3,
    sl_no: 3,
    date: "03 May 2024",
    punch_in: "-",
    punch_out: "-",
    total_working_hrs: "0 hrs",
    ot_hours: "0 hrs",
    status: "Absent(CL)",
    verification_status: "Verified",
  },
  {
    id: 4,
    sl_no: 4,
    date: "04 May 2024",
    punch_in: "09:10 AM",
    punch_out: "08:30 PM",
    total_working_hrs: "11 hrs 20 mins",
    ot_hours: "2 hrs 20 mins",
    status: "Present",
    verification_status: "Verified",
  },
  {
    id: 5,
    sl_no: 5,
    date: "05 May 2024",
    punch_in: "09:05 AM",
    punch_out: "07:35 PM",
    total_working_hrs: "10 hrs 30 mins",
    ot_hours: "1 hr 30 mins",
    status: "Present",
    verification_status: "Not Verified",
  },
  {
    id: 6,
    sl_no: 6,
    date: "06 May 2024",
    punch_in: "-",
    punch_out: "-",
    total_working_hrs: "0 hrs",
    ot_hours: "0 hrs",
    status: "Absent(LOP)",
    verification_status: "Verified",
  },
  {
    id: 7,
    sl_no: 7,
    date: "07 May 2024",
    punch_in: "10:55 AM",
    punch_out: "08:55 PM",
    total_working_hrs: "10 hrs 0 mins",
    ot_hours: "0 hrs 0 mins",
    status: "Present",
    verification_status: "Verified",
  },
  {
    id: 8,
    sl_no: 8,
    date: "08 May 2024",
    punch_in: "09:00 AM",
    punch_out: "07:32 PM",
    total_working_hrs: "10 hrs 32 mins",
    ot_hours: "1 hr 32 mins",
    status: "Present",
    verification_status: "Verified",
  },
  {
    id: 9,
    sl_no: 9,
    date: "09 May 2024",
    punch_in: "-",
    punch_out: "-",
    total_working_hrs: "0 hrs",
    ot_hours: "0 hrs",
    status: "Absent(EL)",
    verification_status: "Verified",
  },
  {
    id: 10,
    sl_no: 10,
    date: "10 May 2024",
    punch_in: "08:55 AM",
    punch_out: "08:50 PM",
    total_working_hrs: "11 hrs 55 mins",
    ot_hours: "2 hrs 55 mins",
    status: "Present",
    verification_status: "Verified",
  },
];
