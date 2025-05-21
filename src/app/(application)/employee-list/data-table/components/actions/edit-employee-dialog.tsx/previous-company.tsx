import React, { useRef, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";

// Assuming you have a FileUpload component
// import { FileUpload } from '@/components/ui/file-upload';
// Assuming a DatePicker or similar for Duration Worked
// import { DatePicker } from '@/components/ui/date-picker';

const PreviousCompanyForm = () => {
  const { control } = useFormContext();

  const experienceCertificateInputRef = useRef<HTMLInputElement>(null);
  const salarySlipInputRef = useRef<HTMLInputElement>(null);
  const [experienceCertificateFileName, setExperienceCertificateFileName] =
    useState("Experience Certificate");
  const [salarySlipFileName, setSalarySlipFileName] = useState("Salary Slip");

  return (
    <div className="space-y-6">
      <div className="mb-4 flex gap-2 items-center">
        <Typography variant="Medium_H4" as="h3" className="text-primary">
          Previous Company Details
        </Typography>
        <div className="border-t w-full flex-1"></div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 lg:gap-x-20">
          <FormField
            control={control}
            name="previous_company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Company</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="last_designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Designation</FormLabel>
                <FormControl>
                  <Input placeholder="Enter role" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="contact_mobile_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Mobile Number</FormLabel>
                <FormControl>
                <PhoneInput
                   defaultCountry="IN"
                    placeholder="Enter mobile number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="previous_email_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 lg:gap-x-20">
          <FormField
            control={control}
            name="duration_worked"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration Worked</FormLabel>
                <FormControl>
                  <Input placeholder="Select duration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="last_drawn_salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Drawn Salary</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter salary"
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
      <div>
        <div className="mb-4 flex gap-2 items-center">
          <Typography variant="Medium_H4" as="h3" className="text-primary">
            Attachment
          </Typography>
          <div className="border-t w-full flex-1"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 lg:gap-x-20">
          <FormField
            control={control}
            name="experience_certificate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Certificate</FormLabel>
                <div className="flex items-center ">
                  <input
                    id="experience-certificate-hidden"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    ref={experienceCertificateInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        setExperienceCertificateFileName(file.name);
                      } else {
                        field.onChange(null);
                        setExperienceCertificateFileName(
                          "Experience Certificate"
                        );
                      }
                    }}
                    className="hidden"
                  />
                  <Input
                    id="experience-certificate"
                    placeholder="Experience Certificate"
                    value={experienceCertificateFileName}
                    readOnly
                    className="flex-grow"
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      experienceCertificateInputRef.current?.click()
                    }
                    className="bg-primary/20 text-primary"
                  >
                    Browse
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="salary_slip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary Slip</FormLabel>
                <div className="flex items-center">
                  <input
                    id="salary-slip-hidden"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    ref={salarySlipInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        setSalarySlipFileName(file.name);
                      } else {
                        field.onChange(null);
                        setSalarySlipFileName("Salary Slip");
                      }
                    }}
                    className="hidden"
                  />
                  <Input
                    id="salary-slip"
                    placeholder="Salary Slip"
                    value={salarySlipFileName}
                    readOnly
                    className="flex-grow"
                  />
                  <Button
                    type="button"
                    onClick={() => salarySlipInputRef.current?.click()}
                    className="bg-primary/20 text-primary"
                  >
                    Browse
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviousCompanyForm;
