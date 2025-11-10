// types/search.types.ts

export type City = {
    id: number;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
  
  export type IndianState = {
    id: number;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
  
  export type Logo = {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    url: string;
  };
  
  export type Ranking = {
    id: number;
    rank: number;
    year: number;
    source: string;
    rank_publisher:string;
    stream:string;
  };
  

  
  export type University = {
    id: number;
    title: string;
    fullForm?: string;
    slug: string;
    description: string;
    accreditation: string;
    avg_package: string;
    city: City;
    indian_state: IndianState;
    logo: Logo;
    ownership: string;
    ranking: Ranking[];
    source: "University";
    streams: Stream[];
    fees: string;
    priority: number;
  };
  
export type Stream = {
    id: number;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
  
  export type Image = {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    url: string;
  };
  
  export type Category = {
    id: number;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
  
  export type Course = {
    id: number;
    title: string;
    short_name: string | null;
    slug: string;
    average_duration: string;
    average_fees: string;
    description: string | null;
    streams: Stream[];
    source: "Course";
    priority: number;
    publishedAt: string;
  };
  
  export type Exam = {
    id: number;
    title: string;
    slug: string;
    conducting_body: string;
    exam_level: string;
    exam_type: string;
    stream: Stream;
    source: "Exam";
    priority: number;
    publishedAt: string;
  };
  
  export type Article = {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: Image;
    category: Category;
    source: "Article";
    priority: number;
    publishedAt: string;
  };
  export type SearchItem = University | Exam | Course | Article;
  
  export type GroupedResults = {
    University: University[];
    Exam: Exam[];
    Course: Course[];
    Article: Article[];
  };
  
  export type SearchIndex = "universityy" | "exam" | "coursee" | "article";
  
  export type IndexConfig = {
    index: SearchIndex;
    source: keyof GroupedResults;
  };
  
  export const SEARCH_INDEXES: IndexConfig[] = [
    { index: "universityy", source: "University" },
    { index: "exam", source: "Exam" },
    { index: "coursee", source: "Course" },
    { index: "article", source: "Article" }
  ];