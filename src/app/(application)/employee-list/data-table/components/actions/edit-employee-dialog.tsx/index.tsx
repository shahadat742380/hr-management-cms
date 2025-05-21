"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";

// ** import components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PersonalDetailsForm from "./personal-details";
import AddressDetailsForm from "./address-details";
import EmergencyContactForm from "./emergency-contact";
import EmploymentDetailsForm from "./employment-details";
import ShiftLeaveForm from "./shift-leave";
import PreviousCompanyForm from "./previous-company";
import { employeeSchema } from "../../../schema/add-employee-schema";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const tabsData = [
  { value: "personal-details", label: "Personal Details" },
  { value: "address-details", label: "Address Details" },
  { value: "emergency-contact", label: "Emergency Contact" },
  { value: "employment-details", label: "Employment Details" },
  { value: "shift-leave", label: "Shift & Leave" },
  { value: "previous-company-details", label: "Previous Company Details" },
];

const EditEmployeeDialog = ({ open, onOpenChange }: DialogProps) => {
  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      full_name: "John Doe",
      employee_id: "EMP123",
      gender: "male",
      date_of_birth: "1990-01-01",
      mobile_number: "",
      email_address: "john.doe@example.com",
      blood_group: "A+",
      marital_status: "single",
      profile_photo: undefined,

      current_address: "123 Main St",
      permanent_address: "123 Main St",
      same_as_current_address: true,
      city: "Anytown",
      state: "CA",
      country: "USA",
      pincode: "90210",

      account_holder_name: "John Doe",
      account_number: "9876543210",
      ifsc_code: "ABCD0123456",
      confirm_account_number: "9876543210",
      bank_name: "Bank of America",

      emergency_contact_name: "Jane Doe",
      emergency_contact_relationship: "Spouse",
      emergency_contact_number: "",
      alternate_number: "",

      joining_date: "2023-01-01",
      department: "it",
      role_designation: "developer",
      work_location: "office",
      monthly_salary: "5000",
      employment_type: "full-time",

      basic_salary: "4000",
      incentive_pay: "500",
      house_rent_allowance: "300",
      meal_allowance: "200",

      provident_fund: "100",
      professional_tax: "50",
      loan_deduction: "200",

      weekly_off_day: ["monday"],
      casual_leave: "10",
      earned_leave: "15",
      sick_leave: "12",

      previous_company: "Old Company",
      last_designation: "Junior Developer",
      duration_worked: "2 years",
      last_drawn_salary: "40000",
      contact_mobile_number: "",
      previous_email_address: "john.doe.old@example.com",
      experience_certificate: undefined,
      salary_slip: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof employeeSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-7xl overflow-hidden p-6 sm:p-8 ">
        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle className="text-primary">Edit Employee</DialogTitle>
        </DialogHeader>

        <Separator orientation="horizontal" />
        <ScrollArea className="h-[70vh]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue={tabsData[0].value} className="w-full">
                <TabsList className=" w-full flex-wrap">
                  {tabsData.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {tabsData.map((tab) => (
                  <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="max-w-3xl py-8 px-1 w-full mx-auto"
                  >
                    {tab.value === "personal-details" && (
                      <PersonalDetailsForm />
                    )}
                    {tab.value === "address-details" && <AddressDetailsForm />}
                    {tab.value === "emergency-contact" && (
                      <EmergencyContactForm />
                    )}
                    {tab.value === "employment-details" && (
                      <EmploymentDetailsForm />
                    )}
                    {tab.value === "shift-leave" && <ShiftLeaveForm />}
                    {tab.value === "previous-company-details" && (
                      <PreviousCompanyForm />
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </form>
          </Form>
        </ScrollArea>
        <Separator orientation="horizontal" />

        {/* Footer */}
        <DialogFooter className="mt-2 flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={() => form.handleSubmit(onSubmit)()}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeDialog;
