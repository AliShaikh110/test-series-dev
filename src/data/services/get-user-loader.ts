/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getOtpSession } from "./get-token";
import { getAuthToken } from "./get-token";

export async function getUserMeLoader() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await axios.get(baseUrl + "/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = response.data;
    return { ok: true, data: data, error: null };
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
}
export async function getUserPicture(userId: any) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await axios.get(baseUrl + `/api/users?filters[id][$eq]=${userId}&populate[picture][populate]=true`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = response.data;
    if (!data[0].picture)
      return { ok: true, data: null, error: null };
    return { ok: true, data: data[0].picture, error: null };
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
}

export async function getUserByJwt(jwt: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!jwt) return { ok: false, data: null, error: null };
  try {
    const response = await axios.get(baseUrl + "/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    const data = response.data;
    return { ok: true, data: data, error: null };
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
}

export async function getConfirmationToken() {
  const baseUrl = process.env.API_URL;

  const otpSession = await getOtpSession();

  if (!otpSession.otpSession) return { ok: false, data: null, error: null };

  try {
    const response = await axios.get(baseUrl + "/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${otpSession.otpSession}`,
      },
    });

    const data = response.data;
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
}

//resend otp
