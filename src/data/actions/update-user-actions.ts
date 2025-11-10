import { IEmailInput } from "@/modules/account/components/profile-email";
import * as zod from "zod";
import { mutateData } from "../services/mutate-data";
import { flattenAttributes } from "@/utils/utils";
import { IPhoneInput } from "@/modules/account/components/profile-phone";
import { getAuthToken } from "../services/get-token";
import { getUserMeLoader } from "../services/get-user-loader";

export const updateEmailSchema = zod.object({
  id: zod.number(),
  email: zod.string().email({
    message: "email is required",
  }),
});

export async function updateEmailAction(prevState: any, data: IEmailInput) {
  const validateEmail = updateEmailSchema.safeParse({
    id: data.id,
    email: data.email,
  });
  if (!validateEmail.success) {
    return {
      zodErrors: validateEmail.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update email.",
    };
  }

  const payload = {
    email: validateEmail.data.email,
  };

  const userId = validateEmail.data.id;
  const responseData = await mutateData(userId, payload);
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to Register.",
    };
  }

  const flattenedData = flattenAttributes(responseData);

  return {
    ...prevState,
    data: flattenedData,
    strapiErrors: null,
    message: "update successfully",
  };
}

// below is sarfraj code

export async function updatePasswordAction(prevState: any, data: string) {}

export const updateNamesSchema = zod.object({
  id: zod.number(),
  firstName: zod.string().min(1, { message: "First name is required" }),
  lastName: zod.string().min(1, { message: "Last name is required" }),
});

export const updatePhoneSchema = zod.object({
  id: zod.number(),
  phone: zod
    .string()
    .min(10, { message: "Phone number is required" })
    .regex(/^\d{10,}$/, { message: "Phone number is invalid" }),
  last_phone_update: zod.date().nullable(),
});

// Action function to update phone and handle state
export async function updatePhoneAction(prevState: any, data: IPhoneInput) {
  // Validate and parse the phone data
  const validatePhone = updatePhoneSchema.safeParse({
    id: data.id,
    phone: data.phone,
    last_phone_update: data.last_phone_update || new Date(), // Use provided date or current date
  });

  // Handle validation errors
  if (!validatePhone.success) {
    return {
      zodErrors: validatePhone.error.flatten().fieldErrors,
      message: "Invalid Fields. Failed to update phone number.",
    };
  }

  // Prepare the payload with Date object
  const payload = {
    phone: validatePhone.data.phone,
    last_phone_update: validatePhone.data.last_phone_update, // Directly use the Date object
  };

  // Call the API with the payload
  const userId = validatePhone.data.id;
  const responseData = await mutateData(userId, payload);

  // Handle response
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to update phone number.",
    };
  }

  // Flatten the response data
  const flattenedData = flattenAttributes(responseData);

  // redirect("/auth/profile")

  return {
    ...prevState,
    data: flattenedData,
    strapiErrors: null,
    message: "Update successfully",
  };
}
export async function createUserDetail(userId: any, payload: any) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetch(
       `https://admin.onlyeducation.co.in/api/user-details`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload), // Send the corrected payload
      }
    );


    if (!response.ok) {
      const responseText = await response.text();
      console.error("API Error:", responseText);
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


export async function graduationData(userId: number, payload: any) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetch(
      `https://admin.onlyeducation.co.in/api/user-details/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ data: payload }),
      }
    );
  
    if (!response.ok) {
      const responseText = await response.text();
      console.error("API Error:", responseText);
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
const onlyLettersAndSpaces = /^[A-Za-z\s]+$/;

export const updateGraduationSchema = zod.object({
  graduationInstitution: zod
    .string()
    .min(2, "Institution Name is required")
    .regex(onlyLettersAndSpaces, "Institution Name can only contain letters"),

  courseDone: zod
    .string()
    .min(2, "Institution Name is required")
    .regex(onlyLettersAndSpaces, "Institution Name can only contain letters"),

  graduationPercentage: zod
    .number()
    .min(1)
    .max(100, "Percentage must be between 0 and 100"),
});

export async function updateGraduationAction(userId: number, data: any) {
  const validation = updateGraduationSchema.safeParse(data);
  if (!validation.success) {
    return {
      zodErrors: validation.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
    };
  }

  const payload = {
    graduationInstitution: validation.data.graduationInstitution,
    courseDone: validation.data.courseDone,
    graduationPercentage: validation.data.graduationPercentage,
  };

  try {
    const responseData = await graduationData(userId, payload);
    return {
      data: responseData,
      success: true,
      message: "Update successfully.",
    };
  } catch (error) {
    return {
      message: "Something went wrong. Please try again.",
      success: false,
      strapiErrors: (error as Error).message,
    };
  }
}

// twelfth education

export const updateTwelfthSchema = zod.object({
  twelfthSchoolName: zod
    .string()
    .min(2, "Institution Name is required")
    .regex(onlyLettersAndSpaces, "Institution Name can only contain letters"),

  twelfthSchoolBoard: zod
    .string()
    .min(2, "Board is required")
    .regex(onlyLettersAndSpaces, "Board can only contain letters"),
  twelfthPercentage: zod
    .number()
    .min(1)
    .max(100, "Percentage must be between 0 and 100"),
  twelfthPassingYear: zod.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    {
      message: "Enter a valid date",
    }
  ),

  twelfthSpecialization: zod
    .string()
    .min(2, "Specialization is required")
    .regex(onlyLettersAndSpaces, "Specialization can only contain letters"),
});

export async function updateTwelfthAction(userId: number, data: any) {
  const validation = updateTwelfthSchema.safeParse(data);
  if (!validation.success) {
    return {
      zodErrors: validation.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
    };
  }

  const payload = {
    twelfthSchoolName: validation.data.twelfthSchoolName,
    twelfthSchoolBoard: validation.data.twelfthSchoolBoard,
    twelfthPercentage: validation.data.twelfthPercentage,
    twelfthPassingYear: validation.data.twelfthPassingYear, // The date will be in "MM/DD/YYYY" format
    twelfthSpecialization: validation.data.twelfthSpecialization,
  };

  try {
    const responseData = await graduationData(userId, payload); // Adjust the API call as needed
    return {
      data: responseData,
      success: true,
      message: "Update successfully.",
    };
  } catch (error) {
    return {
      message: "Something went wrong. Please try again.",
      success: false,
      strapiErrors: (error as Error).message,
    };
  }
}

//tenth update

export const updateTenthSchema = zod.object({
  tenthSchoolName: zod
    .string()
    .min(2, "Institution Name is required")
    .regex(onlyLettersAndSpaces, "Institution Name can only contain letters"),

  tenthSchoolBoard: zod
    .string()
    .min(2, "Board is required")
    .regex(onlyLettersAndSpaces, "Institution Name can only contain letters"),

  tenthPercentage: zod
    .number()
    .min(1)
    .max(100, "Percentage must be between 0 and 100"),

  tenthPassingYear: zod.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    {
      message: "Enter a valid date",
    }
  ),
});

export async function updateTenthAction(userId: number, data: any) {
  const validation = updateTenthSchema.safeParse(data);
  if (!validation.success) {
    return {
      zodErrors: validation.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
    };
  }

  const payload = {
    tenthSchoolName: validation.data.tenthSchoolName,
    tenthSchoolBoard: validation.data.tenthSchoolBoard,
    tenthPercentage: validation.data.tenthPercentage,
    tenthPassingYear: validation.data.tenthPassingYear,
  };

  try {
    const responseData = await graduationData(userId, payload);
    return {
      data: responseData,
      success: true,
      message: "Update successfully.",
    };
  } catch (error) {
    return {
      message: "Something went wrong. Please try again.",
      success: false,
      strapiErrors: (error as Error).message,
    };
  }
}





export const updateUserDetailsSchema = zod.object({
  id: zod.number(),
  fullname: zod
    .string()
    .min(2, "Full name is required")
    .regex(/^[A-Za-z\s]+$/, "Full name can only contain letters and spaces"),
});


export async function updateUserDetailsAction(userId: any, data: any) {
  const validation = updateUserDetailsSchema.safeParse(data);

  if (!validation.success) {
    return {
      zodErrors: validation.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
    };
  }

  const payload = {
    id: data.id,
    fullname: validation.data.fullname,
  };

  try {
    const responseData = await mutateData(userId, payload); // Replace with the appropriate API function
    return {
      data: responseData,
      success: true,
      message: "User details updated successfully.",
    };
  } catch (error) {
    return {
      message: "Something went wrong. Please try again.",
      success: false,
      strapiErrors: (error as Error).message,
    };
  }
}


export async function uploadSingleAction(formData: any) {
  try {
    const data = Object.fromEntries(formData);



    // Upload file first
    const fileUploadResponse = await fetch(`https://admin.onlyeducation.co.in/api/upload`, {
      method: 'POST',
      body: formData, // Pass FormData containing file(s)
    });

    const uploadedFiles = await fileUploadResponse.json();
    const fileId = uploadedFiles[0]?.id;

    if (!fileId) {
      throw new Error('File upload failed.');
    }

    const user = await getUserMeLoader();
    const authToken = await getAuthToken();

    
    const userId = user.data.id;
    // Link the uploaded file to the user
    const userUpdateResponse = await fetch(`https://admin.onlyeducation.co.in/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        picture: fileId
      }),
    });

    const result = await userUpdateResponse.json();

    if (result.error) {
      return {
        uploadError: result.error.message,
        uploadSuccess: null,
      };
    }

    return {
      uploadSuccess: 'Image linked to the user successfully!',
      uploadError: null,
    };
  } catch (error: any) {
    return {
      uploadError: error.message,
      uploadSuccess: null,
    };
  }
}
