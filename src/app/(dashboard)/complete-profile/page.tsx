"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useForm,
  Controller,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
  Control,
} from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  initiateLoginViaProvider,
  updateUserProfile,
  verifyOTPViaProvider,
} from "@/data/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/auth-hook";
import { motion, AnimatePresence } from "framer-motion";
import { educationData } from "@/app/json/sign-up-fields";

// Form schemas with improved validation
const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
});

const otpSchema = z.object({
  otp: z
    .string()
    .min(4, "OTP must be at least 4 digits")
    .max(6, "OTP cannot be more than 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only numbers"),
});

const formSchema = z.object({
  educationLevel: z.string().min(1, "Education level is required"),
  targatedYear: z.string().min(1, "Year is required"),
  streamInterested: z.string().min(1, "Stream is required"),
  courseInterested: z.string().min(1, "Course is required"),
  city: z.string().min(2, "City name must be at least 2 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  // counseling: z.boolean().default(false),
  // onlineDegree: z.boolean().default(false),
  // studyAbroad: z.boolean().default(false),
  // certification: z.boolean().default(false),
  verified: z.boolean().default(false),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormData = z.infer<typeof formSchema>;
type PhoneFormInput = z.infer<typeof phoneSchema>;
type OtpFormInput = z.infer<typeof otpSchema>;

export default function CompleteProfileForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [strapiError, setStrapiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [forceReload, setForceReload] = useState(false);

  const router = useRouter();
  const { user, loading, revalidate } = useAuth({ skipRedirect: true });

  // Prevent back navigation with confirmation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isVerified) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isVerified]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      fullName: "",
      email: user?.email || "",
      // counseling: false,
      // onlineDegree: false, // ✅ Explicit boolean values
      // studyAbroad: false, // ✅ Explicit boolean values
      // certification: false, // ✅ Explicit boolean values
      terms: false,
      verified: false,
      educationLevel: "",
      courseInterested: "",
      streamInterested: "",
      targatedYear: "",
    },
  });

  const selectedLevel = watch("educationLevel");
  const selectedYear = watch("targatedYear");
  const selectedStream = watch("streamInterested");
  const selectedCourse = watch("courseInterested");

  useEffect(() => {
    console.log("Form Errors:", errors);
  }, [errors]);

  console.log(selectedLevel, selectedYear, selectedStream, selectedCourse);

  useEffect(() => {
    if (user?.hasCompletedProfile && user?.verified) {
      router.replace("/");
    }
  }, [user, router]);

  const sendUserHome = () => {
    router.replace("/");
  };

  // Phone form with improved error handling
  const {
    register: registerPhone,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
    setError: setPhoneError,
  } = useForm<PhoneFormInput>({
    resolver: zodResolver(phoneSchema),
  });

  // OTP form with improved validation
  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
    setError: setOtpError,
  } = useForm<OtpFormInput>({
    resolver: zodResolver(otpSchema),
  });

  // Reset form state when user data changes
  useEffect(() => {
    if (user) {
      setIsVerified(user.verified || false);
      reset({
        ...user,
        terms: user.terms || false,
      });
    }
  }, [user, reset, forceReload]);

  // Reset dependent fields when parent field changes
  useEffect(() => {
    if (selectedLevel) {
      setValue("streamInterested", "");
      setValue("courseInterested", "");
    }
  }, [selectedLevel, selectedYear, setValue]);

  const onSubmit = async (data: FormData) => {
    console.log("onsubmit triggered");

    try {
      setIsLoading(true);
      await updateUserProfile(data);
      toast.success("Profile updated successfully!");
      router.replace("/");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onPhoneSubmit: SubmitHandler<PhoneFormInput> = async (data) => {
    try {
      setStrapiError(null);
      setIsLoading(true);

      const result = await initiateLoginViaProvider(
        data.phone,
        user?.email || ""
      );

      if (!result.success) {
        setPhoneError("phone", {
          message: result.message || "Failed to send OTP",
        });
        toast.error(result.message || "Failed to send OTP");
        return;
      }

      setPhoneNumber(data.phone);
      setOtpSent(true);
      toast.success(
        result.isNewUser
          ? "Welcome! Please verify your phone number"
          : "OTP sent successfully"
      );
    } catch (error) {
      console.error("Phone submit error:", error);
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit: SubmitHandler<OtpFormInput> = async (data) => {
    try {
      console.log("triggered");
      setStrapiError(null);
      setIsLoading(true);

      const result = await verifyOTPViaProvider(
        phoneNumber,
        data.otp,
        user?.email || ""
      );

      if (!result.success) {
        setOtpError("otp", { message: result.message || "Invalid OTP" });
        toast.error(result.message || "Verification failed");
        return;
      }

      setIsVerified(true);
      await revalidate();
      setForceReload((prev) => !prev);
      toast.success("Phone number verified successfully");
    } catch (error) {
      console.error("OTP submit error:", error);
      toast.error("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Get available options based on selections
  const getAvailableStreams = () => {
    if (!selectedLevel || !selectedYear) return [];
    //@ts-ignore
    const level = educationData.levels[selectedLevel];
    const nextStepKey = level?.nextSteps[selectedYear] || level?.nextSteps.all;
    //@ts-ignore
    return nextStepKey && educationData.courses[nextStepKey]
      ? //@ts-ignore
        Object.keys(educationData.courses[nextStepKey])
      : [];
  };

  const getAvailableCourses = () => {
    if (!selectedLevel || !selectedYear || !selectedStream) return [];
    //@ts-ignore
    const level = educationData.levels[selectedLevel];
    const nextStepKey = level?.nextSteps[selectedYear] || level?.nextSteps.all;
    return (
      //@ts-ignore

      (nextStepKey && educationData.courses[nextStepKey][selectedStream]) || []
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Render forms based on verification state
  return (
    <div className="w-full relative min-h-screen bg-gray-50  justify-center flex flex-col items-center p-6">
      <Button
        onClick={sendUserHome}
        className=" bg-gray-300 text-gray-700 border hover:bg-gray-200 absolute top-5 right-5"
      >
        skip
      </Button>

      <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm p-6 md:p-8">
        <AnimatePresence mode="wait">
          {!user?.hasCompletedProfile && isVerified ? (
            <VerifiedForm
              control={control}
              errors={errors}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit(onSubmit)}
              selectedLevel={selectedLevel}
              selectedYear={selectedYear}
              selectedStream={selectedStream}
              getAvailableStreams={getAvailableStreams}
              getAvailableCourses={getAvailableCourses}
            />
          ) : otpSent ? (
            <OtpForm
              registerOtp={registerOtp}
              otpErrors={otpErrors}
              isLoading={isLoading}
              onSubmit={handleOtpSubmit(onOtpSubmit)}
              onBack={() => {
                setOtpSent(false);
                setPhoneNumber("");
              }}
            />
          ) : (
            <PhoneForm
              registerPhone={registerPhone}
              phoneErrors={phoneErrors}
              isLoading={isLoading}
              onSubmit={handlePhoneSubmit(onPhoneSubmit)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface VerifiedFormProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  selectedLevel: string;
  selectedYear: string;
  selectedStream: string;
  getAvailableStreams: () => string[];
  getAvailableCourses: () => string[];
}

function VerifiedForm({
  control,
  errors,
  isSubmitting,
  onSubmit,
  selectedLevel,
  selectedYear,
  selectedStream,
  getAvailableStreams,
  getAvailableCourses,
}: VerifiedFormProps) {
  const renderField = (fieldName: keyof FormData, label: string) => {
    const commonInputProps = {
      disabled: isSubmitting,
      className: "h-12",
    };

    if (
      fieldName === "fullName" ||
      fieldName === "email" ||
      fieldName === "city"
    ) {
      return (
        <div key={fieldName} className="space-y-2">
          <Label>{label}</Label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Input
                {...field}
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                type={fieldName === "email" ? "email" : "text"}
                placeholder={`Enter your ${label.toLowerCase()}`}
                {...commonInputProps}
              />
            )}
          />
          {errors[fieldName] && (
            <p className="text-sm text-red-500">{errors[fieldName]?.message}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <h1 className="text-2xl font-semibold text-center mb-8">
        Complete Your Profile
      </h1>

      <form onSubmit={onSubmit} className="space-y-6">
        {renderField("fullName", "Full Name")}
        {renderField("email", "Email")}
        {renderField("city", "City")}

        {/* Education Selection Fields */}
        <EducationFields
          control={control}
          errors={errors}
          selectedLevel={selectedLevel}
          selectedYear={selectedYear}
          selectedStream={selectedStream}
          getAvailableStreams={getAvailableStreams}
          getAvailableCourses={getAvailableCourses}
          isSubmitting={isSubmitting}
        />

        {/* Terms and Submit Button */}
        <TermsAndSubmitSection
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </form>
    </motion.div>
  );
}

interface OtpFormProps {
  registerOtp: UseFormRegister<OtpFormInput>;
  otpErrors: FieldErrors<OtpFormInput>;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

function OtpForm({
  registerOtp,
  otpErrors,
  isLoading,
  onSubmit,
  onBack,
}: OtpFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Enter your OTP</Label>
          <Input
            type="text"
            placeholder="Enter OTP"
            disabled={isLoading}
            {...registerOtp("otp")}
            className={`w-full px-4 py-3 rounded-lg border ${
              otpErrors.otp
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } focus:outline-none focus:ring-2 bg-white/50 backdrop-blur-sm`}
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
          className="w-full py-3 px-4 bg-orange-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              Verify OTP
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-full"
        >
          Change Phone Number
        </Button>
      </form>
    </motion.div>
  );
}

interface PhoneFormProps {
  registerPhone: UseFormRegister<PhoneFormInput>;
  phoneErrors: FieldErrors<PhoneFormInput>;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

function PhoneForm({
  registerPhone,
  phoneErrors,
  isLoading,
  onSubmit,
}: PhoneFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Phone number</Label>
          <Input
            type="tel"
            placeholder="Enter your phone Number"
            disabled={isLoading}
            {...registerPhone("phone")}
            className={`w-full px-4 py-3 rounded-lg border ${
              phoneErrors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } focus:outline-none focus:ring-2 bg-white/50 backdrop-blur-sm`}
          />
          {phoneErrors.phone && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500"
            >
              {phoneErrors.phone.message}
            </motion.p>
          )}
        </div>

        <Button
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
      </form>
    </motion.div>
  );
}
interface EducationFieldsProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  selectedLevel: string;
  selectedYear: string;
  selectedStream: string;
  getAvailableStreams: () => string[];
  getAvailableCourses: () => string[];
  isSubmitting: boolean;
}

function EducationFields({
  control,
  errors,
  selectedLevel,
  selectedYear,
  selectedStream,
  getAvailableStreams,
  getAvailableCourses,
  isSubmitting,
}: EducationFieldsProps) {
  return (
    <>
      {/* Education Level Selection */}
      <div className="space-y-2">
        <Label>Current Education Level</Label>
        <Controller
          name="educationLevel"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={isSubmitting}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select your education level" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(educationData.levels).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label}
                  </SelectItem>
                ))}
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
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {/* @ts-ignore */}
                  {educationData.levels[selectedLevel].years.map(
                    (year: string) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    )
                  )}
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
          <Label>Targeted Stream</Label>
          <Controller
            name="streamInterested"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your targeted stream" />
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
          <Label>Targeted Course</Label>
          <Controller
            name="courseInterested"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your targeted course" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableCourses().map((course: string) => (
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

      {/* <div className="space-y-2 max-w-lg">
        <Label className="font-semibold mb-2 text-gray-500">
          Are you also interested in?
        </Label>
        <div className="flex flex-wrap gap-x-6 gap-y-4">
          <div className="flex items-center space-x-2">
            <Controller
              name="counseling"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  id="counseling"
                  checked={field.value ?? false}
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
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  id="onlineDegree"
                  checked={field.value ?? false}
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
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  id="studyAbroad"
                  checked={field.value ?? false}
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
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  id="certification"
                  checked={field.value ?? false}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="certification">Certification Courses</Label>
          </div>
        </div>
      </div> */}
    </>
  );
}

interface TermsAndSubmitSectionProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  isSubmitting: boolean;
}

function TermsAndSubmitSection({
  control,
  errors,
  isSubmitting,
}: TermsAndSubmitSectionProps) {
  return (
    <>
      {/* Terms and Conditions */}
      <div className="flex items-start space-x-3">
        <Controller
          name="terms"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Checkbox
              id="terms"
              checked={value}
              onCheckedChange={onChange}
              disabled={isSubmitting}
              className="mt-1"
            />
          )}
        />
        <Label htmlFor="terms" className="text-xs text-gray-600">
          I agree to Privacy Policy and Terms & Conditions and provide consent
          to be contacted for promotion via mail, SMS, WhatsApp, etc.
        </Label>
      </div>
      {errors.terms && (
        <p className="text-sm text-red-500">{errors.terms.message}</p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Updating...
          </div>
        ) : (
          "Update Profile"
        )}
      </Button>
    </>
  );
}
