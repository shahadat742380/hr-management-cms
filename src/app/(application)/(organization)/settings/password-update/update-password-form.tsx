/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// ** import core package
import { useState } from "react";

// ** import third party package
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { z } from "zod";

import { Button } from "@/components/ui/button";
// ** import component
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// ** Zod Schema
const profileFormSchema = z
  .object({
    old_password: z
      .string()
      .min(6, { message: "Old password must be at least 6 characters." })
      .max(30, { message: "Old password must not exceed 30 characters." }),
    new_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one number." })
      .regex(/[@$!%*?&]/, {
        message: "Password must contain at least one special character.",
      }),
    confirm_password: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters." }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function UpdatePasswordForm() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Old Password Field */}
          <div className="relative">
            <FormField
              control={form.control}
              name="old_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Enter old password"
                        className="dark:bg-background"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className={cn(
                          "-translate-y-1/2 absolute top-1/2 right-3",
                          "text-primary hover:text-primary/80",
                          "transition-colors focus:outline-none"
                        )}
                      >
                        {showOldPassword ? (
                          <IoEyeOffOutline />
                        ) : (
                          <IoEyeOutline />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* New Password Field */}
          <div className="relative">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="dark:bg-background"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className={cn(
                          "-translate-y-1/2 absolute top-1/2 right-3",
                          "text-primary hover:text-primary/80",
                          "transition-colors focus:outline-none"
                        )}
                      >
                        {showNewPassword ? (
                          <IoEyeOffOutline />
                        ) : (
                          <IoEyeOutline />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="dark:bg-background"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className={cn(
                          "-translate-y-1/2 absolute top-1/2 right-3",
                          "text-primary hover:text-primary/80",
                          "transition-colors focus:outline-none"
                        )}
                      >
                        {showConfirmPassword ? (
                          <IoEyeOffOutline />
                        ) : (
                          <IoEyeOutline />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={passwordLoading}>
            {passwordLoading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
