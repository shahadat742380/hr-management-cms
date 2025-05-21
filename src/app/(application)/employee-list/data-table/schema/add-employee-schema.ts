import { z } from "zod";

export const employeeSchema = z.object({
  // Personal Details
  full_name: z.string().min(1, "Full name is required"),
  employee_id: z.string().min(1, "Employee ID is required"),
  gender: z.string().min(1, "Gender is required"),
  date_of_birth: z.string().min(1, "Date of Birth is required"), // Assuming string for now, potentially refine to date
  mobile_number: z.string().min(10, "Mobile number must be at least 10 digits"), // Basic validation
  email_address: z.string().email("Invalid email address format"),
  blood_group: z.string().min(1, "Blood Group is required"), // Based on dropdown
  marital_status: z.string().min(1, "Marital Status is required"), // Based on dropdown
  profile_photo: z.any().optional(), // File upload

  // Address Details
  current_address: z.string().min(1, "Current Address is required"),
  permanent_address: z.string().min(1, "Permanent Address is required"),
  same_as_current_address: z.boolean(), // Checkbox
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z.string().min(1, "Pincode is required"),

  // Bank Details (within Address Details tab)
  account_holder_name: z.string().min(1, "Account Holder Name is required"),
  account_number: z.string().min(1, "Account Number is required"), // Add more specific validation if needed
  ifsc_code: z.string().min(1, "IFSC Code is required"), // Add more specific validation if needed
  confirm_account_number: z
    .string()
    .min(1, "Confirm Account Number is required"), // Add custom validation for matching account number
  bank_name: z.string().min(1, "Bank Name is required"),

  // Emergency Contact
  emergency_contact_name: z
    .string()
    .min(1, "Emergency contact name is required"),
  emergency_contact_relationship: z.string().min(1, "Relationship is required"),
  emergency_contact_number: z
    .string()
    .min(10, "Emergency contact number must be at least 10 digits"), // Basic validation
  alternate_number: z.string().min(1, "Alternate Number is required"), // Assuming optional becomes required

  // Employment Details
  joining_date: z.string().min(1, "Joining Date is required"), // Assuming string, potentially refine to date
  department: z.string().min(1, "Department is required"), // Based on dropdown
  role_designation: z.string().min(1, "Role/Designation is required"), // Based on dropdown
  work_location: z.string().min(1, "Work Location is required"), // Based on dropdown
  monthly_salary: z.string().min(1, "Monthly Salary is required"), // Assuming string, potentially refine to number
  employment_type: z.string().min(1, "Employment Type is required"), // Based on dropdown

  // Earnings Details (within Employment Details tab)
  basic_salary: z.string().min(1, "Basic Salary is required"), // Assuming string, potentially refine to number
  incentive_pay: z.string().min(1, "Incentive Pay is required"), // Assuming string, potentially refine to number
  house_rent_allowance: z.string().min(1, "House Rent Allowance is required"), // Assuming string, potentially refine to number
  meal_allowance: z.string().min(1, "Meal Allowance is required"), // Assuming string, potentially refine to number

  // Deductions Details (within Employment Details tab)
  provident_fund: z.string().min(1, "Provident Fund is required"), // Assuming string, potentially refine to number
  professional_tax: z.string().min(1, "Professional Tax is required"), // Assuming string, potentially refine to number
  loan_deduction: z.string().min(1, "Loan Deduction is required"), // Assuming string, potentially refine to number

  // Shift & Leave
  weekly_off_day: z.array(z.string()).min(1, "At least one weekly off day is required"), // Array of days
  casual_leave: z.string().min(1, "Casual Leave is required"), // Assuming string, potentially refine to number
  earned_leave: z.string().min(1, "Earned Leave is required"), // Assuming string, potentially refine to number
  sick_leave: z.string().min(1, "Sick Leave is required"), // Assuming string, potentially refine to number

  // Previous Company Details
  previous_company: z.string().min(1, "Previous Company is required"),
  last_designation: z.string().min(1, "Last Designation is required"),
  duration_worked: z.string().min(1, "Duration Worked is required"), // Assuming string, potentially refine to duration/date range
  last_drawn_salary: z.string().min(1, "Last Drawn Salary is required"), // Assuming string, potentially refine to number
  contact_mobile_number: z
    .string()
    .min(10, "Contact Mobile Number is required"), // Basic validation
  previous_email_address: z
    .string()
    .email("Invalid email address format")
    .min(1, "Previous Email Address is required"),
  experience_certificate: z.any(), // File upload
  salary_slip: z.any(), // File upload
});
