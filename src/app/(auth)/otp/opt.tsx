"use client";

// ** import images
import bannerImage from "@/assets/images/auth/auth-img.webp";

// ** import third party packages
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// ** import components
import AuthWrapper from "@/components/auth-wrapper/index";
import { Typography } from "@/components/typography";

// ** import ui components
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

// ** import validation schema
import { otpSchema } from "@/schemas";

const Otp = () => {
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof otpSchema>) {
    console.log(values);
  }

  return (
    <AuthWrapper
      title="OTP verification"
      subtitle='“We have sent a verification code to your email address"'
      titleClassName="mt-16 "
      bannerImage={bannerImage}
      backPath="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-xl">
          <Typography variant="Regular_P" className="text-primary text-center">demoemail@gmail.com</Typography>
          {/* OTP Field */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="mt-8">
                <FormControl>
                  <InputOTP
                    maxLength={4}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    className=" w-full"
                  >
                    <InputOTPGroup className="mx-auto flex justify-between gap-4 md:gap-5">
                      <InputOTPSlot
                        index={0}
                        className="!rounded-none !h-16 !w-16 border text-2xl text-primary md:h-20 md:w-20"
                      />
                      <InputOTPSlot
                        index={1}
                        className="!h-16 !w-16 border text-2xl text-primary md:h-20 md:w-20"
                      />
                      <InputOTPSlot
                        index={2}
                        className="!h-16 !w-16 border text-2xl text-primary md:h-20 md:w-20"
                      />
                      <InputOTPSlot
                        index={3}
                        className="!rounded-none !h-16 !w-16 border text-2xl text-primary md:h-20 md:w-20"
                      />
                    </InputOTPGroup>
                  </InputOTP>
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

export default Otp;
