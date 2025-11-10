// Basic interfaces for nested objects
interface City {
    id: number;
    title: string;
  }
  
  interface IndianState {
    id: number;
    title: string;
  }
  
  interface Ranking {
    id: number;
    rank: string;
  }
  
  interface Tab {
    id: number;
    title: string;
    sections: any[]; // Type can be made more specific based on sections structure
  }
  
  interface Facility {
    id: number;
    title: string;
  }
  
  interface ExamAccepted {
    id: number;
    title: string;
  }
  
   interface Logo {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    createdAt: string;
    updatedAt: string;
    blurhash: string;
  }
  
  // Main college interface
 export interface College {
    id: number;
    title: string;
    slug: string;
    fees: string;
    accreditation: string;
    avg_package: string;
    ownership: 'government' | 'private'; // Can be expanded based on other possible values
    description: string;
    city: City;
    indian_state: IndianState;
    ranking: Ranking[];
    tabs: Tab[];
    facilities: Facility[];
    exams_accepted: ExamAccepted[];
    logo: Logo;
    source:string;
    rankings:{
      rank:string;
      id:number;
      rank_publisher:string;
      stream:string;
    }[]
  }
  export interface Colleges{
    data:College[]
  }


