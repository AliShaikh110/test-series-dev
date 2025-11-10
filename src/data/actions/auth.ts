/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { checkAuth } from "@/lib/auth";
import { User } from "@/types/auth";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthResponse {
  success: boolean;
  message?: string;
  jwt?: string;
  user?: User;
  missingFields?: string[];
  isNewUser?: boolean;
}

// Helper function to handle API responses
async function handleResponse(response: Response): Promise<AuthResponse> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
}

// Helper function to store JWT token in cookies
export async function storeAuthToken(token: string) {
  (await cookies()).set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

/**
 * Initiates the registration/login process by sending OTP
 */
export async function initiateAuth(
  phone: string,
  email: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/api/auth/otp/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, email }),
    });

    const data = await handleResponse(response);
    return {
      success: true,
      message: data.message,
      isNewUser: data.isNewUser,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
/**
 * Initiates the registration/login process by sending OTP
 */
export async function initiateLogin(phone: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/api/auth/otp/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });

    const data = await handleResponse(response);


    return {
      success: true,
      message: data.message,
      isNewUser: data.isNewUser,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

/**
 * Verifies OTP and completes the authentication process
 */
export async function verifyOTP(
  phone: string,
  otp: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/api/auth/otp/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, otp }),
    });

    const data = await handleResponse(response);


    if (data.jwt) {
      storeAuthToken(data.jwt);
    }

    return {
      success: true,
      user: data.user,
      missingFields: data.missingFields,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

/**
 * Verifies OTP and completes the authentication process via Oauth Provider
 */
export async function verifyOTPViaProvider(
  phone: string,
  otp: string,
  email: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(
      `${API_URL}/api/auth/otp/verify-otp-via-provider`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, otp, email }),
      }
    );

    const data = await handleResponse(response);


    if (data.jwt) {
      storeAuthToken(data.jwt);
    }

    return {
      success: true,
      user: data.user,
      missingFields: data.missingFields,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

/**
 * Initiates the registration/login process by sending OTP
 */
export async function initiateLoginViaProvider(
  phone: string,
  email: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/api/auth/otp/login-via-provider`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, email }),
    });

    const data = await handleResponse(response);

    return {
      success: true,
      message: data.message,
      isNewUser: data.isNewUser,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

/**
 * Updates user profile with missing information
 */
export async function updateUserProfile(data: {
  courseInterested?: string;
  studyingIn?: string;
  city?: string;
  [key: string]: any;
}): Promise<AuthResponse> {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token");


    if (!authToken) {
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_URL}/api/auth/otp/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken.value}`,
      },
      body: JSON.stringify(data),
    });


    const responseData = await handleResponse(response);

    return {
      success: true,
      user: responseData.user,
      missingFields: responseData.missingFields,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

/**
 * Logs out the user by removing the auth token
 */

export async function logout() {
  (await cookies()).set("auth_token", "", { expires: new Date(0), path: "/" });
}

export async function getAuthStatus() {
  try {
    const { authenticated, user } = await checkAuth();
    return { authenticated, user };
  } catch (error) {
    console.error("Auth check error:", error);
    return { authenticated: false, user: null };
  }
}
