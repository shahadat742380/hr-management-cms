//  ** import Core Packages **
import React, { useState } from "react";

//  ** import icons **
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

//  ** import third party packages **
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//  ** import ui components **
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// ** import validation schema
import { resetPasswordSchema } from "@/schemas";
import { cn } from "@/lib/utils";

//  ResetForm Props Types :
interface ResetFromPropsTypes {
  setIsResetSucceeded: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetForm = ({ setIsResetSucceeded }: ResetFromPropsTypes) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ** form schema

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    console.log(values);
    setIsResetSucceeded(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-14">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>New password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={cn(
                      "-translate-y-1/2 absolute top-1/2 right-3",
                      "text-primary hover:text-primary/80",
                      "transition-colors focus:outline-none"
                    )}
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="h-5 w-5" />
                    ) : (
                      <IoEyeOutline className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Repeat new password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={cn(
                      "-translate-y-1/2 absolute top-1/2 right-3",
                      "text-primary hover:text-primary/80",
                      "transition-colors focus:outline-none"
                    )}
                  >
                    {showConfirmPassword ? (
                      <IoEyeOffOutline className="h-5 w-5" />
                    ) : (
                      <IoEyeOutline className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-8 w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default ResetForm;
