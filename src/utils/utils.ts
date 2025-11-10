import { NormalizedUniversity, UniversityData1, UniversityData2 } from "@/types/FilteredUniversityTypes";
import { FilterParams, Institution} from "@/types/types";
import { z } from "zod";
import slugify from 'slugify';

 // Import the slugify function


const baseUrl = process.env.NEXT_PUBLIC_API_URL;


//  HELPER FUNCTIONS FOR FETCHING the data
export async function fetchData(path: string, options: RequestInit) {
  try {
    const response = await fetch(path, options);
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function getFetchOptions(): RequestInit {
  if (process.env.NODE_ENV !== "production") {
    return { cache: "no-store" as RequestCache };
  } else {
    return { next: { revalidate: 9600 } };
  }
}
function getNewsFetchOptions(): RequestInit {
  if (process.env.NODE_ENV !== "production") {
    return { cache: "no-store" as RequestCache };
  } else {
    return { next: { revalidate: 30 } };
  }
}

function getPaginationQuery(currentPage: number, pageSize: number) {
  return `&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`;
}

export function flattenAttributes(data: any): any {
  // Check if data is a plain object; return as is if not
  if (
    typeof data !== "object" ||
    data === null ||
    data instanceof Date ||
    typeof data === "function"
  ) {
    return data;
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item));
  }

  // Initialize an object with an index signature for the flattened structure
  let flattened: { [key: string]: any } = {};

  // Iterate over each key in the object
  for (let key in data) {
    // Skip inherited properties from the prototype chain
    if (!data.hasOwnProperty(key)) continue;

    // If the key is 'attributes' or 'data', and its value is an object, merge their contents
    if (
      (key === "attributes" || key === "data") &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenAttributes(data[key]));
    } else {
      // For other keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenAttributes(data[key]);
    }
  }

  return flattened;
}

const token = process.env.NEXT_PUBLIC_Directus_TOKEN;

export async function fetchCachedData(path: string) {
  try {
    const options: RequestInit = {
      headers: { Authorization: `Bearer ${token}` },
      ...(process.env.NODE_ENV !== "production"
        ? { cache: "no-store" as RequestCache }
        : { next: { revalidate: 9600 } }),
    };

    const response = await fetch(baseUrl + path, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error(error);
  }

  /**
   * @param {string} path
   * @returns data that are cached Already from specified Url (Data frequency can be set in env for cached data)
   */
}



export async function fetchCachedTableData(path: string) {
  try {
    const options: RequestInit = {
      headers: { Authorization: `Bearer ${token}` },
      ...(process.env.NODE_ENV !== "production"
        ? { cache: "no-store" as RequestCache }
        : { next: { revalidate: 9600 } }),
    };

    const response = await fetch('https://custombackend.onlyeducation.co.in' + path, options);
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error(error);
  }

  /**
   * @param {string} path
   * @returns data that are cached Already from specified Url (Data frequency can be set in env for cached data)
   */
}


export async function getNewsData(path: string) {
  try {
    const options: RequestInit = {
      headers: { Authorization: `Bearer ${token}` },
      ...(process.env.NODE_ENV !== "production"
        ? { cache: "no-store" as RequestCache }
        : { next: { revalidate: 3600 } }),
    };

    const response = await fetch(baseUrl + path, options);
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchPaginatedUniList(path: string, currentPage: number) {
  const PAGE_SIZE = parseInt(process.env.PAGE_SIZE || "19", 10);
  const paginationQuery = getPaginationQuery(currentPage, PAGE_SIZE);
  const fullPath = "https://custombackend.onlyeducation.co.in" + path + paginationQuery;
  const data = await fetchData(fullPath, getFetchOptions());


  return {
    meta:data.meta,
    data: data.data,
    hasMore: data.meta.pagination.page < data.meta.pagination.pageCount,
  };
}


export async function fetchPaginatedList(path: string, currentPage: number) {
  const PAGE_SIZE = parseInt(process.env.PAGE_SIZE || "19", 10);
  const paginationQuery = getPaginationQuery(currentPage, PAGE_SIZE);
  const fullPath = baseUrl + path + paginationQuery;
  const data = await fetchData(fullPath, getFetchOptions());


  return {
    meta:data.meta,
    data: data.data,
    hasMore: data.meta.pagination.page < data.meta.pagination.pageCount,
  };
}

export async function fetchFrequentData(path: string, currentPage: number) {
  const PAGE_SIZE = parseInt(process.env.PAGE_SIZE || "25", 15);
  const paginationQuery = getPaginationQuery(currentPage, PAGE_SIZE);
  const fullPath = baseUrl + path + paginationQuery;
  const data = await fetchData(fullPath, getNewsFetchOptions());

  return {
    data: data.data,
    hasMore: data.meta.pagination.page < data.meta.pagination.pageCount,
  };
}

export async function getMetaData(plural: string, slug: string) {
  const seoQuery = `/api/${plural}?filters[slug][$eq]=${slug}&populate[seo][populate][metaSocial][populate]=true&populate[seo][populate][metaImage][populate]=true&fields[0]=id&fields[1]=title`;
  const fullPath = baseUrl + seoQuery;
  return await fetchData(fullPath, getNewsFetchOptions());
}

export async function getUniversities(path: string, currentPage: number) {
  const PAGE_SIZE = parseInt(process.env.PAGE_SIZE || "10", 10);
  const paginationQuery = getPaginationQuery(currentPage, PAGE_SIZE);
  const fullPath = baseUrl + path + paginationQuery;
  return await fetchData(fullPath, getFetchOptions());
}

export async function getCachedData(path: string) {
  try {
    const response = await fetch(baseUrl + path);
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error(error);
  }
}

export async function getLandingMetaData(q: string) {
  try {
    const options: RequestInit = {
      headers: { Authorization: `Bearer ${token}` },
      ...(process.env.NODE_ENV !== "production"
        ? { cache: "no-store" as RequestCache }
        : { next: { revalidate: 3600 } }),
    };
    const response = await fetch(baseUrl + q, options);
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error(error);
  }
}

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}

export const enquiryFormSchema = z.object({
  level: z.string({
    required_error: "please select the level",
  }),
  specialization: z.string({
    required_error: "please select the specialization",
  }),
});

export const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
  e.target.value = value; // Set the input value
};

export const maskPhoneNumber = (username: string | undefined) => {
  if (!username) return;
  return username.replace(/\d{6}(\d{4})/, "******$1");
};



export const buildUniversityListQuery = (
  baseQuery: string,
  filterParams: FilterParams,
  params: { stream: string }
) => {

  const {
    locationsParam,
    ownershipsParam,
  } = filterParams;
  let query = baseQuery;

  if (locationsParam) {
    query += `&${locationsParam
      .split(",")
      .map((location) => `filters[indian_state][slug][$eq]=${location}`)
      .join("&")}`;
  }

  if (ownershipsParam) {
    query += `&filters[ownership][slug][$eq]=${ownershipsParam}`;
  }
 
  if (params.stream !== "all") {
    query += `&filters[streams][slug][$eq]=${params.stream}`;
  }

  return query;
};


export function universalAdapter(data:  UniversityData1[] | UniversityData2[] ): NormalizedUniversity[] {
  const isFirstStructure = (item: UniversityData1 | UniversityData2): item is UniversityData1 => 
    'fullForm' in item;

  return data.map(item => {
    if (isFirstStructure(item)) {
      // First data structure
      return {
        id: item.id,
        slug: item.slug,
        fullForm: item.fullForm,
        searchableImage: {
          url: item.searchableImage.url,
          blurhash: item.searchableImage.blurhash
        },
        indian_state: {
          title: item.indian_state.title
        },
        ownership: {
          title: item.ownership.title
        },
        universityProfile: {
          description: item.universityProfile.description,
          fees: item.universityProfile.fees,
          avgPackage: item.universityProfile.avgPackage
        },
     
       
      };
    } else {
      // Second data structure
      return {
        id: item.university_id,
        slug: item.university_slug,
        fullForm: item.university_fullform,
        searchableImage: {
          url: item.image_url,
          blurhash: null
        },
        indian_state: {
          title: item.indian_state_name
        },
        ownership: {
          title: item.ownership_name
        },
        universityProfile: {
          description: item.description,
          fees: item.fees,
          avgPackage: item.avg_package
        },
        rankingNumber:item.ranking_number,
        rankingPublisher:item.ranking_publisher,
        rankingYear:item.ranking_year,
        pubisherImg:item.ranking_publisher_image_url
       
      };
    }
  });
}

export const getUserData = (user: any) => {
  if (user?.data) {
    const { id, verified, phone, email, fullName } = user.data;
    return { id, verified, phone, email, fullName };
  }
};

// utils/transformData.ts
export const transformUserData = (
  formData: any,
  data: any,
  userId?: number
) => {
  if (!userId) {
    throw new Error("User ID is required for data transformation.");
  }

  const transformedData1 = {
    gender: formData.data.gender.toLowerCase(),
    graduationInstitution: formData.data.graduationCollege,
    courseDone: formData.data.course,
    graduationPercentage: formData.data.graduationPercentage,
    entranceExamAttempted: formData.data.entranceExam.toLowerCase(),
  };

  const transformedData2 = {
    tenthSchoolBoard: data.data.tenthBoard,
    tenthPassingYear: data.data.tenthYear,
    tenthPercentage: data.data.tenthPercentage,
    tenthSchoolName: data.data.tenthSchool,
    twelfthSchoolBoard: data.data.twelfthBoard,
    twelfthPassingYear: data.data.twelfthYear,
    twelfthPercentage: data.data.twelfthPercentage,
    twelfthSchoolName: data.data.twelfthSchool,
    twelfthSpecialization: data.data.twelfthSpecialization,
    users_permissions_user: userId,
  };

  return { data: { ...transformedData1, ...transformedData2 } };
};

// utils/examUtils.ts

export function extractEntranceExams(data: any[]): any {
  const entranceExams: any[] = [];

  data.forEach((category: any) => {
    if (category.entrance_exams && category.entrance_exams.data) {
      category.entrance_exams.data.forEach((exam: any) => {
        entranceExams.push({
          title: exam.title,
          slug: exam.slug,
        });
      });
    }
  });

  return { data: entranceExams };
}

export const getTimeAgo = (date: string | Date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};



export async function fetchExamDataByStreams(streams: string[], limit = 4) {
  const examPromises = streams.map((stream) =>
    fetchCachedData(
      `/api/exams?fields[0]=title&fields[1]=slug&populate[highlights][filters][key][$eq]=Short+Exam+Name&filters[stream][slug][$eq]=${stream}&pagination[pageSize]=${limit}`
    )
  );
  return Promise.all(examPromises);
}

export async function fetchCourseDataByStreams(streams: string[], limit = 4) {
  const coursePromises = streams.map((stream) =>
    fetchCachedData(
      `/api/coursees?fields[0]=title&fields[1]=slug&populate[highlights][filters][key][$eq]=Short+Exam+Name&filters[streams][slug][$eq]=${stream}&pagination[pageSize]=${limit}`
    )
  );
  return Promise.all(coursePromises);
}

export async function fetchNavigationDataByStreams(streams: string[], limit = 6) {
  const examPromises = streams.map((stream) =>
    fetchCachedData(
      `/api/exams?fields[0]=title&fields[1]=slug&&populate[highlights][filters][key][$eq]=Short+Exam+Name&filters[stream][slug][$eq]=${stream}&pagination[pageSize]=${limit}`
    )
  );
  return Promise.all(examPromises);
}
export async function fetchNavigationDataBycourses(streams: string[], limit = 6) {
  const examPromises = streams.map((stream) =>
    fetchCachedData(
      `/api/coursees?fields[0]=title&fields[1]=slug&filters[streams][slug][$eq]=${stream}&pagination[pageSize]=${limit}`
    )
  );
  return Promise.all(examPromises);
}




// Input types
interface ExamHighlight {
  id: number;
  key: string;
  value: string;
}

interface InputExamData {
  id: number;
  slug: string;
  highlights: ExamHighlight[];
  universityys:{
    data:{
      id:number;
    }[]
  }

}

export interface ExamDataForFilter {
  data: InputExamData[];
}

// Output types
interface OutputExamData {
  id: number;
  title: string;
  slug: string;
  universityys:{
    data:{
      id:number;
    }[]
  }
}

interface OutputData {
  data: OutputExamData[];
}
export const transformExamData = (input: ExamDataForFilter): OutputData => {
  const transformedData = input.data.map(exam => {
    // Find the 'Short Exam Name' from highlights
    // Taking the first occurrence in case of duplicates
    const examTitle = exam.highlights.find(h => h.key === 'Short Exam Name')?.value || '';

    return {
      id: exam.id,
      title: examTitle,
      slug: exam.slug,
      universityys:exam.universityys
    };
  });

  return {
    data: transformedData
  };
};

export const getUniversityDataByCity = async (city: string): Promise<Institution[]> => {
  let apiUrl = '';

  if (city === "All India") {
    apiUrl = `/api/universities?populate[indian_state][fields][0]=title&populate[logo][populate]=true&populate[city][fields][0]=title&populate[ranking][populate]=true&populate[exams_accepted]populate=true&filters[streams][slug][$eq]=engineering`;
  } else {
    const slugifiedCity = slugify(city, { lower: true });
    apiUrl = `/api/universities?populate[indian_state][fields][0]=title&populate[logo][populate]=true&populate[city][fields][0]=title&populate[ranking][populate]=true&populate[exams_accepted]populate=true&filters[city][slug][$eq]=${slugifiedCity}&filters[streams][slug][$eq]=engineering`;
  }

  // Fetch data from the constructed URL
  try {
    const response = await fetchCachedData(apiUrl);

    // Assuming the response contains a `data` field with the university data
    if (response && response.data) {
      return response.data; // Return the fetched data (Institution[] type)
    } else {
      return []; // Return an empty array if no data is found
    }
  } catch (error) {
    console.error("Error fetching universities:", error);
    return []; // Return an empty array in case of error
  }
};
