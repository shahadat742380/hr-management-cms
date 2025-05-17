type Employee = {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  role: string;
  joinDate: string; // ISO format or readable string (depends on use case)
  efficiency: string; // Can also be number if you strip '%'
  attendance: {
    presentDays: number;
    leaveDays: number;
  };
  monthlySalary: number;

  status: "Active" | "Inactive";
};

export const employees: Employee[] = [
  {
    id: 1,
    employeeId: "EMP1000",
    name: "Kevin Baker",
    email: "kdelacruz@williams-lopez.biz",
    role: "Mobile App Developer",
    joinDate: "Nov 7, 2021",
    efficiency: "100%",
    attendance: { presentDays: 30, leaveDays: 0 },
    monthlySalary: 27681,

    status: "Active",
  },
  {
    id: 2,
    employeeId: "EMP1001",
    name: "Carrie Frazier",
    email: "tyronewalters@evans.com",
    role: "Frontend Developer",
    joinDate: "Feb 26, 2019",
    efficiency: "77%",
    attendance: { presentDays: 25, leaveDays: 0 },
    monthlySalary: 52477,

    status: "Active",
  },
  {
    id: 3,
    employeeId: "EMP1002",
    name: "Brittany Moore",
    email: "smcconnell@yahoo.com",
    role: "Frontend Developer",
    joinDate: "Apr 13, 2015",
    efficiency: "100%",
    attendance: { presentDays: 25, leaveDays: 0 },
    monthlySalary: 40139,

    status: "Inactive",
  },
  {
    id: 4,
    employeeId: "EMP1003",
    name: "Michelle Valenzuela",
    email: "cannonelizabeth@ray-ellis.biz",
    role: "Backend Developer",
    joinDate: "Mar 20, 2023",
    efficiency: "100%",
    attendance: { presentDays: 30, leaveDays: 0 },
    monthlySalary: 55475,

    status: "Active",
  },
  {
    id: 5,
    employeeId: "EMP1004",
    name: "Katherine Barker",
    email: "knewton@hotmail.com",
    role: "UI/UX designer",
    joinDate: "Dec 22, 2006",
    efficiency: "100%",
    attendance: { presentDays: 28, leaveDays: 3 },
    monthlySalary: 59578,

    status: "Active",
  },
  {
    id: 6,
    employeeId: "EMP1005",
    name: "Madison Lopez",
    email: "ktorres@gmail.com",
    role: "Graphic Designer",
    joinDate: "Dec 24, 2007",
    efficiency: "0%",
    attendance: { presentDays: 22, leaveDays: 2 },
    monthlySalary: 37068,

    status: "Active",
  },
  {
    id: 7,
    employeeId: "EMP1006",
    name: "Alyssa Wagner",
    email: "jessebrewer@gmail.com",
    role: "Backend Developer",
    joinDate: "Feb 12, 2008",
    efficiency: "86%",
    attendance: { presentDays: 27, leaveDays: 1 },
    monthlySalary: 41647,

    status: "Active",
  },
  {
    id: 8,
    employeeId: "EMP1007",
    name: "Patricia Gomez",
    email: "chelsealondry@harrison.info",
    role: "Frontend Developer",
    joinDate: "May 15, 2014",
    efficiency: "100%",
    attendance: { presentDays: 29, leaveDays: 0 },
    monthlySalary: 50776,

    status: "Inactive",
  },
  {
    id: 9,
    employeeId: "EMP1008",
    name: "Wendy Brown",
    email: "dicksoncody@hotmail.com",
    role: "Project Manager",
    joinDate: "May 5, 2013",
    efficiency: "78%",
    attendance: { presentDays: 24, leaveDays: 2 },
    monthlySalary: 42849,

    status: "Active",
  },
  {
    id: 10,
    employeeId: "EMP1009",
    name: "Erica Gray",
    email: "nthompson@shuffman.com",
    role: "Backend Developer",
    joinDate: "Mar 5, 2014",
    efficiency: "100%",
    attendance: { presentDays: 26, leaveDays: 1 },
    monthlySalary: 52373,

    status: "Inactive",
  },
];

export type { Employee };
