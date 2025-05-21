import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/typography";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const WEEKLY_OFF_OPTIONS = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

const ShiftLeaveForm = () => {
  const { control, setValue } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="mb-4 flex gap-2 items-center">
        <Typography variant="Medium_H4" as="h3" className="text-primary">
          Shift & Leave
        </Typography>
        <div className="border-t w-full flex-1"></div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 lg:gap-x-20">
          <FormField
            control={control}
            name="weekly_off_day"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Weekly Off Day</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-primary cursor-pointer ml-1" />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Select the regular weekly off day for the employee.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <MultiSelect
                    options={WEEKLY_OFF_OPTIONS}
                    onValueChange={(values) => {
                      // Store as comma-separated string for compatibility with schema
                      setValue("weekly_off_day", values.join(","));
                    }}
                    defaultValue={
                      Array.isArray(field.value)
                        ? field.value
                        : typeof field.value === "string" &&
                          field.value.length > 0
                        ? field.value.split(",")
                        : []
                    }
                    placeholder="Select weekly off day(s)"
                    maxCount={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="casual_leave"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Casual Leave (CL) per Year</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-primary cursor-pointer ml-1" />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Enter the number of annual casual leave (CL) days
                        allotted.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <Input
                    placeholder="Enter annual CL quota"
                    {...field}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 lg:gap-x-20">
          <FormField
            control={control}
            name="earned_leave"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Earned Leave (EL) per Year</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-primary cursor-pointer ml-1" />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Enter the number of annual earned leave (EL) days
                        allotted.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <Input
                    placeholder="Enter annual EL quota"
                    {...field}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="sick_leave"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Sick Leave (SL) per Year</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-primary cursor-pointer ml-1" />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Enter the number of annual sick leave (SL) days
                        allotted.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <Input
                    placeholder="Enter annual SL quota"
                    {...field}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ShiftLeaveForm;
