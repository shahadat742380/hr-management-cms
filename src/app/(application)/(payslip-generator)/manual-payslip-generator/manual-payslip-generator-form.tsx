"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { MultiSelect } from "@/components/ui/multi-select";
import CheckPayslipGenerationDialog from "../_components/check-payslip-generation-dialog";

// Define validation schema
const formSchema = z.object({
  month_year: z.date({ required_error: "Month and Year is required." }),
  employees: z
    .array(z.string())
    .min(1, { message: "Please select at least one employee." }),
  email_subject_template: z
    .string()
    .min(1, { message: "Email subject template is required." }),
  email_body: z.string().min(1, { message: "Email body is required." }),
});

type FormValues = z.infer<typeof formSchema>;

// Dummy employee data for MultiSelect
const employeeOptions = [
  { label: "Sathish", value: "sathish" },
  { label: "Rajeev", value: "rajeev" },
  { label: "Employee 3", value: "employee3" },
  { label: "Employee 4", value: "employee4" },
];

const ManualPayslipGeneratorForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      month_year: new Date(), // Default to current month/year
      employees: [],
      email_subject_template: "Payslip for [Month, Year] - [Employee Name]",
      email_body:
        "Dear [Employee Name],\n\nYour salary payslip for [Month, Year] has been generated.\nPlease find the attached document for your reference.\nFor any queries, contact the HR department.\n\nThank you,\nHR Team",
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    // TODO: Implement manual payslip generation logic
    setIsDialogOpen(true);
  }

  return (
    <section className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Select Month & Year */}
            <FormField
              control={form.control}
              name="month_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Month & Year</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between text-left font-normal"
                      >
                        {field.value
                          ? format(field.value, "MMM yyyy")
                          : "Pick a date"}
                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        // We might need to customize Calendar or use a different component for month/year only selection
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Choose Employee */}
            <FormField
              control={form.control}
              name="employees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose Employee</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={employeeOptions}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select employees"
                      maxCount={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email Subject Template */}
          <FormField
            control={form.control}
            name="email_subject_template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Subject Template</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Payslip for [Month, Year] - [Employee Name]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Body Template */}
          <FormField
            control={form.control}
            name="email_body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Body Template</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter email body"
                    className="min-h-[150px] resize-none font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Generate Payslip</Button>
          </div>
        </form>
      </Form>
      <CheckPayslipGenerationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
};

export default ManualPayslipGeneratorForm;
