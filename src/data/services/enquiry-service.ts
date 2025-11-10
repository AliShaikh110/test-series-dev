/* eslint-disable @typescript-eslint/no-explicit-any */
const baseUrl = "https://admin.onlyeducation.co.in";


export async function enquiryService(
  userId: number,
) {
  try {



    return {
      success: true,
      error: false,
      userId: userId,
    };
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      error: true,
      userId: userId,
    };
  }
}


export async function registerEnquiryService(userData: any) {
  const url = new URL("/api/auth/local/register", baseUrl);
  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      cache: "no-cache",
    });

    return await response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
    throw new Error("Failed to register user. Please try again later.");
  }
}