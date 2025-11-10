import { getAuthToken } from "./get-token";


export async function mutateData(userId?:number, payload?: any) {

  const authToken = await getAuthToken();

  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetch(`https://admin.onlyeducation.co.in/api/users/${userId}?populate=*`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...payload }),
    });
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}



