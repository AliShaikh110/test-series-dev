const token = process.env.NEXT_PUBLIC_Directus_TOKEN;
const baseUrl = "https://directus.onlyeducation.co.in";

export async function fetchCachedData(path: string) {
  try {
    const options: RequestInit = {
      headers: { Authorization: `Bearer ${token}` },
      ...(process.env.NODE_ENV !== "production"
        ? { cache: "no-store" as RequestCache }
        : { next: { revalidate: 9600 } }),
    };

    const response = await fetch(baseUrl + path, options);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error(error);
  }
}