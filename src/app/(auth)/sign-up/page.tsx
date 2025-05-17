"use client";

import { useRouter } from "next/navigation";
// ** Import Core Packages
import { useState } from "react";

// ** Import Third-Party Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// ** import images
import bannerImage from "@/assets/images/auth/login.webp";

// ** Import Icons
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

// ** Import UI Components
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

// ** Import Auth Client Instance
import { authClient } from "@/lib/auth-client";

// ** Import Validation Schema

import AuthWrapper from "@/components/auth-wrapper";
import { Typography } from "@/components/typography";
import Link from "next/link";

const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().min(1, "Email is required!!!").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    setLoading(true);
    try {
      const { name, email, password } = values;

      const { error } = await authClient.signUp.email(
        { name, email, password },
        {
          onRequest: () => console.log("Signup request initiated..."),
          onSuccess: () => {
            toast.success("Signup successful. Please log in.");
            router.push("/sign-up");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to sign up.");
          },
        },
      );

      if (error) {
        console.log("Signup error:", error);
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Failed to sign up. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper
      title="Welcome to Sign up Page!"
      subtitle="Enter your credentials to create your account."
      titleClassName="mt-6 lg:mt-10"
      bannerImage={bannerImage}
    >
      <div className="mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <div className="relative mt-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowPassword(!showPassword);
                  }
                }}
                role="button"
                tabIndex={0}
                className="absolute top-11 right-5 cursor-pointer text-gray-500"
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="mt-6 w-full" disabled={loading}>
              Sign Up
            </Button>
          </form>
        </Form>
        <Typography variant="Regular_H6" className="mt-4 block text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary">
            Log In
          </Link>
        </Typography>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
