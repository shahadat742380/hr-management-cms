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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Typography } from "@/components/typography";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const EmploymentDetailsForm = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4 flex gap-2 items-center">
          <Typography variant="Medium_H4" as="h3" className="text-primary">
            Employment Details
          </Typography>
          <div className="border-t w-full flex-1"></div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 lg:gap-x-20">
            <FormField
              control={control}
              name="joining_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Joining Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {field.value
                            ? format(new Date(field.value), "dd MMM yyyy")
                            : "Select Date"}
                          <CalendarIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(
                              date ? format(date, "yyyy-MM-dd") : ""
                            )
                          }
                          initialFocus
                          disabled={(date) => date > new Date()}
                          className="pointer-events-auto p-3"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* Add actual department options here */}
                      <SelectItem value="it">IT</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 lg:gap-x-20">
            <FormField
              control={control}
              name="role_designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role/Designation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* Add actual role/designation options here */}
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="work_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* Add actual location options here */}
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 lg:gap-x-20">
            <FormField
              control={control}
              name="monthly_salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Salary</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter salary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="employment_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* Add actual employment type options here */}
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4 flex gap-2 items-center">
          <Typography variant="Medium_H4" as="h3" className="text-primary">
            Employment Details
          </Typography>
          <div className="border-t w-full flex-1"></div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 lg:gap-x-20">
            <FormField
              control={control}
              name="basic_salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Basic (₹)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter basic salary amount"
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
              name="incentive_pay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incentive Pay (₹)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter incentive pay amount"
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
              name="house_rent_allowance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House Rent Allowance (₹)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter house rent allowance"
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
              name="meal_allowance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Allowance (₹)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter meal allowance"
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

      <div>
        <div className="mb-4 flex gap-2 items-center">
          <Typography variant="Medium_H4" as="h3" className="text-primary">
            Deductions Details
          </Typography>
          <div className="border-t w-full flex-1"></div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 lg:gap-x-20">
            <FormField
              control={control}
              name="provident_fund"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provident Fund (₹)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter provident fund amount"
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
              name="professional_tax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Tax (₹)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter professional tax amount"
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
              name="loan_deduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Deduction (₹)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter loan deduction amount"
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
    </div>
  );
};

export default EmploymentDetailsForm;
