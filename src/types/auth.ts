// types/auth.ts
import { z } from "zod";

export interface User {
  id: number;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  job: string | null;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  username: string;
  phone: string;
  verified: boolean;
  fullname: string;
  city: string;
  alsoInterestedIn: string;
  counseling: boolean;
  onlineDegree: boolean;
  educationLevel: string;
  streamInterested: string;
  targatedYear: string;
  studyAbroad: boolean;
  certification: boolean;
  courseInterested: string;
  hasCompletedProfile: boolean;
  terms: boolean;
}

export interface AuthResponse<T> {
  ok: boolean;
  data: T | null;
  error: Error | null;
}

export const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  studyingIn: z.string().min(1, "Please select your current education"),
  courseInterested: z.string().min(1, "Please select your course interest"),
  city: z.string().min(1, "Please enter your city"),
  counseling: z.boolean().optional(),
  onlineDegree: z.boolean().optional(),
  studyAbroad: z.boolean().optional(),
  certification: z.boolean().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type SignupFormData = z.infer<typeof signupSchema>;
