"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const attendanceSchema = z.object({
  date: z.string().min(1, "Date is required"),
  name: z.string().min(1, "Name is required"),
  punch_in_hour: z.string().regex(/^\d{2}$/, "Hour required"),
  punch_in_minute: z.string().regex(/^\d{2}$/, "Minute required"),
  punch_in_period: z.enum(["AM", "PM"]),
  punch_out_hour: z.string().regex(/^\d{2}$/, "Hour required"),
  punch_out_minute: z.string().regex(/^\d{2}$/, "Minute required"),
  punch_out_period: z.enum(["AM", "PM"]),
  total_working_hours: z.string().regex(/^\d{1,2}$/, "Required"),
  total_working_minutes: z.string().regex(/^\d{1,2}$/, "Required"),
  ot_hours: z.string().regex(/^\d{1,2}$/, "Required"),
  ot_minutes: z.string().regex(/^\d{1,2}$/, "Required"),
  status: z.enum(["Present", "Absent", "Half Day", "Leave"]),
});

const defaultValues: z.infer<typeof attendanceSchema> = {
  date: "2024-05-01",
  name: "Kevin Baker",
  punch_in_hour: "09",
  punch_in_minute: "27",
  punch_in_period: "AM",
  punch_out_hour: "07",
  punch_out_minute: "38",
  punch_out_period: "PM",
  total_working_hours: "10",
  total_working_minutes: "11",
  ot_hours: "01",
  ot_minutes: "11",
  status: "Present",
};

const hourOptions = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);
const minuteOptions = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);
const periodOptions = ["AM", "PM"];
const statusOptions = ["Present", "Absent", "Half Day", "Leave"];

const EditAttendanceDetailsDialog = ({ open, onOpenChange }: DialogProps) => {
  const methods = useForm<z.infer<typeof attendanceSchema>>({
    resolver: zodResolver(attendanceSchema),
    defaultValues,
  });
  const { control, handleSubmit } = methods;

  function onSubmit(values: z.infer<typeof attendanceSchema>) {
    // Handle update logic
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-2xl overflow-hidden p-6 sm:p-8 ">
        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle className="text-primary">
            Edit Attendance Details
          </DialogTitle>
        </DialogHeader>
        <Separator orientation="horizontal" />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 lg:gap-x-20 mb-6">
              {/* Date */}
              <FormField
                control={control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Date</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-primary cursor-pointer ml-1" />
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            Attendance date (not editable)
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <Input
                        value={field.value}
                        disabled
                        className="bg-primary/10 font-semibold text-lg text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Name */}
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        disabled
                        className="bg-primary/10 font-semibold text-lg text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 lg:gap-x-20 mb-6">
              {/* Punch-In */}
              <FormItem>
                <FormLabel>Punch-In</FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={control}
                    name="punch_in_hour"
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="HH" />
                          </SelectTrigger>
                          <SelectContent>
                            {hourOptions.map((h) => (
                              <SelectItem key={h} value={h}>
                                {h}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <span className="self-center">:</span>
                  <FormField
                    control={control}
                    name="punch_in_minute"
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {minuteOptions.map((m) => (
                              <SelectItem key={m} value={m}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <FormField
                    control={control}
                    name="punch_in_period"
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="AM/PM" />
                          </SelectTrigger>
                          <SelectContent>
                            {periodOptions.map((p) => (
                              <SelectItem key={p} value={p}>
                                {p}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
              </FormItem>
              {/* Punch-Out */}
              <FormItem>
                <FormLabel>Punch-Out</FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={control}
                    name="punch_out_hour"
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="HH" />
                          </SelectTrigger>
                          <SelectContent>
                            {hourOptions.map((h) => (
                              <SelectItem key={h} value={h}>
                                {h}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <span className="self-center">:</span>
                  <FormField
                    control={control}
                    name="punch_out_minute"
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {minuteOptions.map((m) => (
                              <SelectItem key={m} value={m}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <FormField
                    control={control}
                    name="punch_out_period"
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="AM/PM" />
                          </SelectTrigger>
                          <SelectContent>
                            {periodOptions.map((p) => (
                              <SelectItem key={p} value={p}>
                                {p}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
              </FormItem>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 lg:gap-x-20 mb-6">
              {/* Total Working Hours */}
              <FormItem>
                <FormLabel>Total Working Hours</FormLabel>
                <div className="flex gap-2 items-center">
                  <FormField
                    control={control}
                    name="total_working_hours"
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="HH" />
                          </SelectTrigger>
                          <SelectContent>
                            {hourOptions.map((h) => (
                              <SelectItem key={h} value={h}>
                                {h}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <span className="text-primary ">hrs</span>
                  <FormField
                    control={control}
                    name="total_working_minutes"
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {minuteOptions.map((m) => (
                              <SelectItem key={m} value={m}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <span className="text-primary ">mins</span>
                </div>
              </FormItem>
              {/* OT Hours */}
              <FormItem>
                <FormLabel>OT Hours</FormLabel>
                <div className="flex gap-2 items-center">
                  <FormField
                    control={control}
                    name="ot_hours"
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="HH" />
                          </SelectTrigger>
                          <SelectContent>
                            {hourOptions.map((h) => (
                              <SelectItem key={h} value={h}>
                                {h}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <span className="text-primary ">hrs</span>
                  <FormField
                    control={control}
                    name="ot_minutes"
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {minuteOptions.map((m) => (
                              <SelectItem key={m} value={m}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <span className="text-primary ">mins</span>
                </div>
              </FormItem>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 lg:gap-x-20 mb-6">
              {/* Status */}
              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </FormProvider>
        <Separator orientation="horizontal" />
        {/* Footer */}
        <DialogFooter className="mt-2 flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAttendanceDetailsDialog;
