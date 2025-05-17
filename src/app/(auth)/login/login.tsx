"use client";

// ** Import Core Packages
import { useState } from "react";

// ** Import Third-Party Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

// ** Import Icons
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

// ** Import Components
import AuthWrapper from "@/components/auth-wrapper/index";

// ** Import UI Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

// ** Import Assets
import bannerImage from "@/assets/images/auth/login.webp";


// ** Import Validation Schema
import { loginSchema } from "@/schemas";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };

  return (
    <AuthWrapper
      title="Welcome back again!"
      subtitle="Log in with your credentials"
      titleClassName="mt-6 lg:mt-16"
      bannerImage={bannerImage}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                   
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-muted-foreground">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      className=" pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={cn(
                        "-translate-y-1/2 absolute top-1/2 right-3",
                        "text-primary hover:text-primary/80",
                        "transition-colors focus:outline-none",
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

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="remember_me"
              render={({ field }) => (
                <FormItem className="flex items-center cursor-pointer space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      id="remember_me"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-0"
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="remember_me"
                    className="cursor-pointer select-none font-normal text-muted-foreground text-sm hover:text-primary"
                  >
                    Remember Me
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default Login;
