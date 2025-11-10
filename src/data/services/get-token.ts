"use server"
import { cookies } from "next/headers";

export async function getAuthToken() {
  const authToken = (await cookies()).get("auth_token")?.value;
  return authToken;
}

export async function getOtpSession() {
  const otpSession = (await cookies()).get("OS")?.value;
  return {
    otpSession,
  };
}

export async function getResendOtpSession() {
  const resendOtpSession = (await cookies()).get("ROS")?.value;
  return {
    resendOtpSession,
  };
}