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
import { format, addMonths } from "date-fns";
import CheckPayslipGenerationDialog from "../_components/check-payslip-generation-dialog";

// Define validation schema
const formSchema = z.object({
  scheduled_day: z.date({ required_error: "Scheduled day is required." }),
  next_scheduled_date: z.date({
    required_error: "Next scheduled date is required.",
  }),
  email_subject_template: z
    .string()
    .min(1, { message: "Email subject template is required." }),
  email_body: z.string().min(1, { message: "Email body is required." }),
});

type FormValues = z.infer<typeof formSchema>;

const AutoPayslipGeneratorForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      scheduled_day: new Date(),
      next_scheduled_date: addMonths(new Date(), 1),
      email_subject_template: "",
      email_body: "",
    },
  });

  // Watch scheduledDay to update nextScheduledDate
  const scheduledDay = form.watch("scheduled_day");

  // Update nextScheduledDate whenever scheduledDay changes
  React.useEffect(() => {
    if (scheduledDay) {
      form.setValue("next_scheduled_date", addMonths(scheduledDay, 1));
    }
  }, [scheduledDay, form]);

  function onSubmit(data: FormValues) {
    console.log(data);
    // TODO: Implement payslip generation logic
    setIsDialogOpen(true);
  }

  return (
    <section className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scheduled Day of Every Month */}
            <FormField
              control={form.control}
              name="scheduled_day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scheduled Day of Every Month</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {field.value
                            ? format(field.value, "dd MMM yyyy")
                            : format(new Date(), "dd MMM yyyy")}
                          <CalendarIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) =>
                            date < new Date() &&
                            date.getDate() !== new Date().getDate()
                          }
                          className="pointer-events-auto p-3"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Next Scheduled Date */}
            <FormField
              control={form.control}
              name="next_scheduled_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Scheduled Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        value={
                          field.value ? format(field.value, "dd MMM yyyy") : ""
                        }
                        disabled
                        placeholder="Next Scheduled Date"
                        className="disabled:bg-primary/20 disable:text-foreground disabled:opacity-100"
                      />
                      <div className="absolute top-1/2 -translate-y-1/2 right-4">
                        <CalendarIcon className="h-4 w-4" />
                      </div>
                    </div>
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
                    placeholder="e.g. Payslip for [Month, Year]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Body */}
          <FormField
            control={form.control}
            name="email_body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Body</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter email body"
                    className="resize-none min-h-[280px] font-medium"
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

export default AutoPayslipGeneratorForm;
