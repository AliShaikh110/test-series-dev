import axios from "axios";

const baseUrl = "https://admin.onlyeducation.co.in";

type dataProp = {};

export async function enquiryService(
  userId: number,
  uniId: number,
  level: string,
  specicalization: string
) {
  try {

    const response = await axios.post(`${baseUrl}/api/enquiries`, {
      data: {
        users_permissions_user: {
          connect: [userId],
        },
        enquires: [
          {
            university: {
              connect: [uniId],
            },
            level: level,
            specialization: specicalization,
          },
        ],
      },
    });
   

    return {
      success: true,
      error: false,
      userId: userId,
    };
  } catch (error) {
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