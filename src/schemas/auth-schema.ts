import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required!!!").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
  remember_me: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required!!!").email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    confirm_password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const popupResetPasswordSchema = z
  .object({
    old_password: z.string().min(8, "Password must be at least 8 characters"),
    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    confirm_password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const otpSchema = z.object({
  otp: z
    .string({
      required_error: "OTP is required",
    })
    .length(4, "OTP must be exactly 4 digits")
    .regex(/^\d+$/, "OTP must only contain numbers"),
});

export const profileSchema = z.object({
  profile: z.any(),
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  role: z
    .string()
    .min(1, { message: "Role is required." })
    .max(50, { message: "Role cannot exceed 50 characters." }),
  email_id: z.string().email({ message: "Invalid email address." }),
  phone_no: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Invalid phone number. Include country code.",
  }),
});
