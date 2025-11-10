"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  initiateAuth,
  verifyOTP,
  updateUserProfile,
} from "@/data/actions/auth";
import { cn } from "@/utils/cn";
import { useAuth } from "@/hooks/auth-hook";
import GoogleLoginButton from "@/components/google-login-button";
import { educationData } from "@/app/json/sign-up-fields";
import CitySelector from "@/components/cityselector";

// Define validation schemas
const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  city: z.string().min(1, "Please enter your city"),
  // Updated fields to match your form:
  educationLevel: z.string().min(1, "Education level is required"), // ✅
  targatedYear: z.string().min(1, "Year is required"), // ✅
  streamInterested: z.string().min(1, "Stream is required"), // ✅
  courseInterested: z.string().min(1, "Course is required"), // ✅
  counseling: z.boolean().default(false),
  onlineDegree: z.boolean().default(false),
  studyAbroad: z.boolean().default(false),
  certification: z.boolean().default(false),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

const otpSchema = z.object({
  otp: z
    .string()
    .min(4, "OTP must be at least 4 digits")
    .max(6, "OTP cannot be more than 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only numbers"),
});

type SignupFormData = z.infer<typeof signupSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const [strapiError, setStrapiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState<SignupFormData | null>(null);

  const { loading, isAuthenticated } = useAuth({ skipRedirect: true });
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  // Main signup form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      counseling: false,
      onlineDegree: false,
      studyAbroad: false,
      certification: false,
      terms: false,
      educationLevel: "",
      targatedYear: "",
      streamInterested: "",
      courseInterested: "",
    },
  });

  // OTP form
  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const selectedLevel = watch("educationLevel");
  const selectedYear = watch("targatedYear");
  const selectedStream = watch("streamInterested");

  // Reset dependent fields when level changes
  useEffect(() => {
    if (selectedLevel) {
      setValue("targatedYear", "");
      setValue("streamInterested", "");
      setValue("courseInterested", "");
    }
  }, [selectedLevel, setValue]);

  // Reset course when stream changes
  useEffect(() => {
    if (selectedStream) {
      setValue("courseInterested", "");
    }
  }, [selectedStream, setValue]);

  // Get available streams based on level and year

  const getAvailableStreams = () => {
    if (!selectedLevel || !selectedYear) return [];
    // @ts-ignore
    const level = educationData.levels[selectedLevel];
    let nextStepKey = level.nextSteps[selectedYear] || level.nextSteps.all;
    // @ts-ignore
    if (nextStepKey && educationData.courses[nextStepKey]) {
      // @ts-ignore
      return Object.keys(educationData.courses[nextStepKey]);
    }
    return [];
  };

  // Get available courses based on stream
  const getAvailableCourses = () => {
    if (!selectedLevel || !selectedYear || !selectedStream) return [];
    // @ts-ignore
    const level = educationData.levels[selectedLevel];
    let nextStepKey = level.nextSteps[selectedYear] || level.nextSteps.all;
    // @ts-ignore
    if (nextStepKey && educationData.courses[nextStepKey][selectedStream]) {
      // @ts-ignore
      return educationData.courses[nextStepKey][selectedStream];
    }
    return [];
  };

  // Handler for initial signup form submission
  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
      setStrapiError(null);
      setIsLoading(true);
      setFormData(data);

      const result = await initiateAuth(data.phone, data.email);

      if (!result.success) {
        setStrapiError(result.message || "Failed to send OTP");
        toast.error(result.message || "Failed to send OTP");
        return;
      }

      setOtpSent(true);
      toast.success("OTP sent to your phone number");
    } catch (error) {
      console.error("💥 Signup error:", error);
      toast.error("Failed to start signup process");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for OTP verification
  const onOtpSubmit: SubmitHandler<OtpFormData> = async (data) => {
    if (!formData) {
      toast.error("Missing form data");
      return;
    }

    try {
      setStrapiError(null);
      setIsLoading(true);

      // Verify OTP
      const verifyResult = await verifyOTP(formData.phone, data.otp);

      if (!verifyResult.success) {
        setStrapiError(verifyResult.message || "Verification failed");
        toast.error(verifyResult.message || "Verification failed");
        return;
      }

      // Update user profile
      const updateResult = await updateUserProfile({
        fullName: formData.fullName,
        email: formData.email,
        targatedYear: formData.targatedYear,
        educationLevel: formData.educationLevel,
        streamInterested: formData.streamInterested,
        courseInterested: formData.courseInterested,
        city: formData.city,
        counseling: formData.counseling || false,
        onlineDegree: formData.onlineDegree || false,
        studyAbroad: formData.studyAbroad || false,
        certification: formData.certification || false,
      });

      if (!updateResult.success) {
        setStrapiError(updateResult.message || "Failed to complete signup");
        toast.error(updateResult.message || "Failed to complete signup");
        return;
      }

      // Store user data and redirect
      if (updateResult.user) {
        localStorage.setItem("user", JSON.stringify(updateResult.user));
      }

      toast.success("Successfully signed up!");
      router.push("/dashboard");
    } catch (error) {
      console.error("💥 OTP verification error:", error);
      toast.error("Failed to complete signup");
    } finally {
      setIsLoading(false);
    }
  };
  let content = (
    <div className=" w-full rounded-t-3xl md:py-0 py-6 md:pt-12 -mt-7 z-10 bg-white md:bg-transparent shadow-[3px_-36px_59px_-14px_rgba(0,_0,_0,_0.1)] p-3 sm:p-6  md:p-8">
      <div className="md:mt-20 max-w-xl mx-auto">
        <h1 className="mb-6 text-2xl">Sign Up</h1>

        {strapiError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-md border border-red-100"
          >
            {strapiError}
          </motion.div>
        )}
        <GoogleLoginButton />
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fullname</Label>
              <Input
                {...register("fullName")}
                placeholder="Full Name"
                className="h-12"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="h-12"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                {...register("phone")}
                placeholder="Phone"
                className="h-12"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Education Level Selection */}
            <div className="space-y-2">
              <Label>Current Education Level</Label>
              <Controller
                name="educationLevel"
                control={control}
                rules={{ required: "Education level is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(educationData.levels).map(
                        ([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value.label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.educationLevel && (
                <p className="text-sm text-red-500">
                  {errors.educationLevel.message}
                </p>
              )}
            </div>

            {/* Year Selection */}
            {selectedLevel && (
              <div className="space-y-2">
                <Label>Select Year</Label>
                <Controller
                  name="targatedYear"
                  control={control}
                  rules={{ required: "Year is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          // @ts-ignore
                          educationData.levels[selectedLevel].years.map(
                            (year: any) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            )
                          )
                        }
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.targatedYear && (
                  <p className="text-sm text-red-500">
                    {errors.targatedYear.message}
                  </p>
                )}
              </div>
            )}

            {/* Stream Selection */}
            {selectedYear && getAvailableStreams().length > 0 && (
              <div className="space-y-2">
                <Label>Targated Stream</Label>
                <Controller
                  name="streamInterested"
                  control={control}
                  rules={{ required: "Stream is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12">
                        <SelectValue
                          placeholder={`Select your targeted stream`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableStreams().map((stream) => (
                          <SelectItem key={stream} value={stream}>
                            {stream}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.streamInterested && (
                  <p className="text-sm text-red-500">
                    {errors.streamInterested.message}
                  </p>
                )}
              </div>
            )}

            {/* Course Selection */}
            {selectedStream && getAvailableCourses().length > 0 && (
              <div className="space-y-2">
                <Label> Targated Course</Label>
                <Controller
                  name="courseInterested"
                  control={control}
                  rules={{ required: "Course is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your targated course" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableCourses().map((course: any) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.courseInterested && (
                  <p className="text-sm text-red-500">
                    {errors.courseInterested.message}
                  </p>
                )}
              </div>
            )}

            {/* <div className="space-y-2">
              <Label>City</Label>
              <Input
                {...register("city")}
                placeholder="City You Live In"
                className="h-12"
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city.message}</p>
              )}
            </div> */}

            <div className="space-y-2 w-full relative flex flex-col">
              <Label>City</Label>

              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <CitySelector
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.city}
                  />
                )}
              />
              {errors.city && (
                <p className="text-sm text-red-500 ">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 max-w-lg">
            <Label className="font-semibold mb-2 text-gray-500">
              Are you also interested in?
            </Label>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              <div className="flex items-center space-x-2">
                <Controller
                  name="counseling"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="counseling"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="counseling">Admission Counseling</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Controller
                  name="onlineDegree"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="onlineDegree"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="onlineDegree">Online Degree</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Controller
                  name="studyAbroad"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="studyAbroad"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="studyAbroad">Study Abroad</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Controller
                  name="certification"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="certification"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="certification">Certification Courses</Label>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2 mt-6">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="peer h-4 w-4 shrink-0 rounded-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
                />
              )}
            />
            <Label htmlFor="terms" className="text-xs text-gray-600">
              I agree to Privacy Policy and Terms & Conditions and provide
              consent to be contacted for promotion via mail, sms, whatsapp,
              etc.
            </Label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-500">{errors.terms.message}</p>
          )}

          <Button
            onClick={() => {}}
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-orange-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending OTP...
              </>
            ) : (
              <>
                Send OTP
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className=" underline cursor-pointer text-blue-500"
            >
              Login
            </Link>{" "}
            to continue
          </div>
        </form>
      </div>
    </div>
  );

  // OTP verification form
  if (otpSent) {
    return (
      <div className="w-full rounded-t-3xl  h-full flex justify-center items-center md:py-0 py-6 -mt-7 z-10 bg-white md:bg-transparent shadow-[3px_-36px_59px_-14px_rgba(0,_0,_0,_0.1)] p-3 sm:p-6 md:p-8">
        <div className=" md:mt-20 mx-auto max-w-2xl">
          <h1 className="mb-6 text-2xl">Verify OTP</h1>
          <form onSubmit={handleOtpSubmit(onOtpSubmit)} className="space-y-3">
            <div className="space-y-2">
              <Label>Enter verification code</Label>
              <Input
                type="text"
                placeholder="Enter OTP"
                disabled={isLoading}
                {...registerOtp("otp")}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border",
                  otpErrors.otp
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                )}
              />
              {otpErrors.otp && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500"
                >
                  {otpErrors.otp.message}
                </motion.p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-orange-500 text-white rounded-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify OTP
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => setOtpSent(false)}
              className="w-full"
            >
              Change Phone Number
            </Button>
          </form>
        </div>
      </div>
    );
  }
  if (loading) {
    content = (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return content;
}
