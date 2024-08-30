import { z } from "zod";

// SIGN UP FORM SCHEMA
export const signUpFormSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    name: z.string().min(4, { message: "Name must be at least 4 character" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 character" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

// SIGN IN FORM SCHEMA
export const signInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});
