"use client";

// ** import images
import bannerImage from "@/assets/images/auth/auth-img.webp";

// ** import third party packages
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// ** import ui components
import { Button } from "@/components/ui/button";

import AuthWrapper from "@/components/auth-wrapper/index";
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
import { forgotPasswordSchema } from "@/schemas";

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    console.log(values);
  }
  return (
    <AuthWrapper
      title="Forgot Password "
      subtitle="Lorem ipsum dolor sit amet"
      titleClassName="mt-6 lg:mt-16 "
      bannerImage={bannerImage}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto mt-8 max-w-3xl">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
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
    </AuthWrapper>
  );
};

export default ForgotPassword;
