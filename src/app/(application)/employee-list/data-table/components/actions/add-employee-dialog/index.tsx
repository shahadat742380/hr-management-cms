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

const AddEmployeeDialog = ({ open, onOpenChange }: DialogProps) => {
  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      full_name: "",
      employee_id: "EMP123",
      gender: "",
      date_of_birth: "",
      mobile_number: "",
      email_address: "",
      blood_group: "",
      marital_status: "",
      profile_photo: undefined,

      current_address: "",
      permanent_address: "",
      same_as_current_address: false,
      city: "",
      state: "",
      country: "",
      pincode: "",

      account_holder_name: "",
      account_number: "",
      ifsc_code: "",
      confirm_account_number: "",
      bank_name: "",

      emergency_contact_name: "",
      emergency_contact_relationship: "",
      emergency_contact_number: "",
      alternate_number: "",

      joining_date: "",
      department: "",
      role_designation: "",
      work_location: "",
      monthly_salary: "",
      employment_type: "",

      basic_salary: "",
      incentive_pay: "",
      house_rent_allowance: "",
      meal_allowance: "",

      provident_fund: "",
      professional_tax: "",
      loan_deduction: "",

      weekly_off_day: [],
      casual_leave: "",
      earned_leave: "",
      sick_leave: "",

      previous_company: "",
      last_designation: "",
      duration_worked: "",
      last_drawn_salary: "",
      contact_mobile_number: "",
      previous_email_address: "",
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
          <DialogTitle className="text-primary">Add New Employee</DialogTitle>
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

export default AddEmployeeDialog;
