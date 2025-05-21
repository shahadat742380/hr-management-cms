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
import { PhoneInput } from "@/components/ui/phone-input";

const EmergencyContactForm = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Typography variant="Medium_H4" as="h3" className="text-primary">
          Emergency Contact
        </Typography>
        <div className="border-t w-full flex-1"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 lg:gap-x-20">
        <FormField
          control={control}
          name="emergency_contact_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="emergency_contact_relationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship</FormLabel>
              <FormControl>
                <Input placeholder="Enter relationship" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 lg:gap-x-20">
        <FormField
          control={control}
          name="emergency_contact_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="IN"
                  placeholder="Enter number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="alternate_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alternate Number</FormLabel>
              <FormControl>
              <PhoneInput
                  defaultCountry="IN"
                  placeholder="Enter number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default EmergencyContactForm;
