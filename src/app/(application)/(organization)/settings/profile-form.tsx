/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// ** import core package
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

// ** import third party package
import { toast } from "sonner";
import { z } from "zod";

import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
// ** import component
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { authClient } from "@/lib/auth-client";
import axiosInstance from "@/config/axios";

// Define validation schema
const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name must not be longer than 30 characters." }),
  email: z
    .string({ required_error: "Please enter an email." })
    .email({ message: "Invalid email address." }),
  phone_no: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Invalid phone number. Include country code.",
  }),
  role: z
    .string()
    .min(2, { message: "Role must be at least 2 characters." })
    .max(30, { message: "Role must not be longer than 30 characters." }),
  author_image: z
    .string({
      required_error: "Image is Required!!!",
    })
    .optional(),
});

// Define form type
type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [profileImg, setProfileImg] = useState("");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      author_image: "",
      phone_no: "",
      role: "",
    },
  });

  // Update form values when session is loaded
  useEffect(() => {
    if (session?.user) {
      form.reset({
        phone_no: session.user.phoneNumber || "",
        name: session.user.name,
        email: session.user.email,
        author_image: session.user.image || "",
        role: session.user.role || "",
      });
      setProfileImg(session?.user?.image || "");
    }
  }, [session, form, session?.user?.image]);

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);

    try {
      await authClient.updateUser({
        name: data.name,
        phoneNumber: data.phone_no,
      });
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update name:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* File Upload Field */}
        <FormField
          control={form.control}
          name="author_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Photo</FormLabel>
              <ImageUpload
                initialImage={field.value || profileImg}
                onUpdate={async (file) => {
                  const formData = new FormData();
                  formData.append("profilePic", file); // append the file directly

                  try {
                    const res = await axiosInstance.put(
                      "/user/update-profile-picture",
                      formData, // Send the FormData directly
                      {
                        headers: {
                          "Content-Type": "multipart/form-data", // Ensure the correct content type for form data
                        },
                      },
                    );

                    const profilePic = res.data.profilePicUrl;

                    console.log("Profile Picture:", profilePic);
                    if (profilePic) {
                      authClient.updateUser({
                        image: profilePic,
                      });
                      setProfileImg(profilePic);
                      toast.success(res.data.message);
                    } else {
                      toast.error(res.data.message);
                    }
                  } catch (error) {
                    console.error("Error uploading file:", error);
                    toast.error(`Error uploading file: ${error}`);
                  }
                }}
                onRemove={() => {
                  field.onChange("");
                  authClient.updateUser({
                    image: "",
                  });
                  setProfileImg("/image-placeholder.png");
                  toast.success("Profile picture removed successfully.");
                }}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    value={field.value ?? ""}
                    className="w-full dark:bg-background"
                  />
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
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Enter your email"
                    {...field}
                    value={field.value ?? ""}
                    className="w-full disabled:bg-primary/10 disabled:text-foreground disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phone_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    defaultCountry="IN"
                    placeholder="Enter phone number"
                    className="dark:bg-background"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role Field */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Enter your email"
                    {...field}
                    value={field.value ?? "Admin"}
                    className="w-full capitalize disabled:bg-primary/10 disabled:text-foreground disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
