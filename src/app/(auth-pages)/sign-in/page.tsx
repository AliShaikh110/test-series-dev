"use client";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { initiateLogin, verifyOTP } from "@/data/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/auth-hook";
import GoogleLoginButton from "@/components/google-login-button";

// Form schemas
 const phoneSchema = z.object({
   phone: z
     .string()
     .min(10, "Mobile number must be 10 digits")
     .max(10, "Mobile number must be 10 digits")
     .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
 });

 const otpSchema = z.object({
   phone: z.string(),
   otp: z
     .string()
     .min(4, "OTP must be at least 4 digits")
     .max(6, "OTP cannot be more than 6 digits")
     .regex(/^[0-9]+$/, "OTP must contain only numbers"),
 });

type PhoneFormInput = z.infer<typeof phoneSchema>;
type OtpFormInput = z.infer<typeof otpSchema>;


export default function AuthForm() {
  const [strapiError, setStrapiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();

  const { loading, isAuthenticated } = useAuth({ skipRedirect: true });
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  // Phone form
  const {
    register: registerPhone,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
  } = useForm<PhoneFormInput>({
    resolver: zodResolver(phoneSchema),
  });

  // OTP form
  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<OtpFormInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      phone: phoneNumber,
      otp: "",
    },
  });

  const onPhoneSubmit: SubmitHandler<PhoneFormInput> = async (data) => {
    try {
      setStrapiError(null);
      setIsLoading(true);

      const result = await initiateLogin(data.phone);

      if (!result.success) {
        console.error("❌ Phone Verification Error:", result.message);
        setStrapiError(result.message || "Failed to send OTP");
        toast.error(result.message || "Failed to send OTP");
        return;
      }

      // Store phone number for OTP verification
      setPhoneNumber(data.phone);
      setOtpSent(true);

      // Show success message
      toast.success("OTP sent successfully");

      // If this is a new user, we might want to show different message
      if (result.isNewUser) {
        toast.info("Welcome! Please verify your phone number to continue");
      }
    } catch (error) {
      console.error("💥 Unexpected error in phone submit:", error);
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit: SubmitHandler<OtpFormInput> = async (data) => {
    try {
      setStrapiError(null);
      setIsLoading(true);

      const result = await verifyOTP(phoneNumber, data.otp);

      if (!result.success) {
        console.error("❌ OTP Verification Error:", result.message);
        setStrapiError(result.message || "Verification failed");
        toast.error(result.message || "Verification failed");
        return;
      }

      // If verification successful but missing required fields
      if (result.missingFields?.length) {
        // Store user data in localStorage if needed
        if (result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }
        // Redirect to profile completion page with missing fields
        toast.info("Please complete your profile to continue");
        router.push(`/complete-profile`);
        return;
      }

      // If all required fields are complete
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success("Successfully logged in");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("💥 Unexpected error in OTP submit:", error);
      toast.error("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  let content = (
    <div className=" w-full rounded-t-3xl md:py-0 py-6 md:pt-12 -mt-7 z-10 bg-white md:bg-transparent shadow-[3px_-36px_59px_-14px_rgba(0,_0,_0,_0.1)] p-3 sm:p-6  md:p-8">
      <div className="max-w-2xl  lg:mt-20  mx-auto">
        <h1 className="mb-6 text-2xl">Login</h1>
        {strapiError && (
          // <motion.div
          //   initial={{ opacity: 0, y: -10 }}
          //   animate={{ opacity: 1, y: 0 }}
          //   className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-md border border-red-100"
          // >
          //   {strapiError}
          // </motion.div>
          <div></div>
        )}

        {/* Google Sign In */}
        <GoogleLoginButton />
        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {!otpSent ? (
          <form
            onSubmit={handlePhoneSubmit(onPhoneSubmit)}
            className="space-y-4"
          >
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
        ) : (
          <form onSubmit={handleOtpSubmit(onOtpSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Enter your otp</Label>
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
                // <motion.p
                //   initial={{ opacity: 0 }}
                //   animate={{ opacity: 1 }}
                //   className="text-sm text-red-500"
                // >
                //   {otpErrors.otp.message}
                // </motion.p>
                <div></div>
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
              onClick={() => {
                setOtpSent(false);
                setPhoneNumber("");
              }}
              className="w-full"
            >
              Change Phone Number
            </Button>
          </form>
        )}

        <div className="text-center text-sm pt-3  text-gray-600">
          Dont have an account?{" "}
          <Link
            href="/sign-up"
            className=" underline cursor-pointer text-blue-500"
          >
            Sign up
          </Link>{" "}
          to continue
        </div>
      </div>
    </div>
  );
  if (loading) {
    content = (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return content;
}



