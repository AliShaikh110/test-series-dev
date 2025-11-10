"use server";
import axios from "axios";
import { cookies } from "next/headers";

const COOKIE_NAME = "auth_token";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CACHE_DURATION = 0; // 1 minute cache

/**
 * Checks authentication status and returns user data if authenticated
 */
export async function checkAuth(): Promise<{
  authenticated: boolean;
  user?: any;
  missingFields?: string[];
}> {
  const cookieStore = await cookies();
  try {
    const authToken = cookieStore.get("auth_token");

    if (!authToken) {
      return { authenticated: false };
    }
    const response = await axios.get(API_URL + "/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken.value}`,
      },
    });

    const result = {
      authenticated: true,
      user: response.data,
      missingFields: [""],
    };

    return result;
  } catch (error) {
    console.log(error);

    return {
      authenticated: false,
    };
  }
}
