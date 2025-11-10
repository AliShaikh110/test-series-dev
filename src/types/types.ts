/* eslint-disable @typescript-eslint/no-explicit-any */
// types.ts

export interface HeaderProps {
  id: number;
  title: string;
  description: string | null;
}

export interface faqProps {
  id: number;
  question: string;
  answer: string;
}

export interface QnaProps {
  id: number;
  Question: string;
  Answer: string;
}

export interface Links {
  id: number;
  href: string;
  label: string;
  target: string | null;
  isExternal: boolean;
}

export interface Dropdown {
  id: number;
  label: string;
  href: string;
  subMenuLinks: subMenuLinks[];
}

export interface CountryProps {
  id: number;
  title: string;
  slug: string;
  noOfStudentsStudying: string;
}

export interface subMenuLinks {
  id: number;
  href: string;
  label: string | null;
  target: string | null;
  isExternal: boolean;
  university: University;
  country: CountryProps;
}


export interface Navigation {
  id: number;
  links: Links[];
  dropdown: Dropdown[];
}

//image Props from strapi response
interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  blurhash: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}
//for logo in uni
export interface Logo {
  data: LogoData;
}

interface LogoData {
  id: number;
  attributes: LogoAttributes;
}

interface LogoAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: LogoFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  blurhash: string;
}

interface LogoFormats {
  thumbnail: Thumbnail;
}

interface Thumbnail {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}
export interface ImageAttributes {
  // To Do reduce incomming objects (query optimization)

  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    small: ImageFormat;
    thumbnail: ImageFormat;
  };
  blurhash: string;
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
}

export interface CategoryAttributes {
  data: {
    id: number;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  }[]
}

export interface ArticleAttributes {
  id: number;
  title: string;
  slug: string;
  live: string | null;
  description: string | undefined;
  image: ImageAttributes;
  categories: CategoryAttributes;
  recommendedArticle: string | null;
  createdAt: Date;
  readingTime: string
  createdBy: {
    id: number;
    firstname: string;
    lastname: string
    username: string
  };
  publishedAt: Date;
  ckeditor_content: string;
}
// types.ts
export interface College {
  id: number;
  _meilisearch_id: string;
  title: string;
  slug: string;
  description: string;
  fees: string;
  avg_package: string;
  accreditation: string;
  ownership: string;
  createdAt: string | null;
  updatedAt: string | null;
  publishedAt: string;

  indian_state: {
    id: number;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };

  city: {
    id: number;
    title: string;
    slug: string;
    createdAt: string | null;
    updatedAt: string | null;
    publishedAt: string | null;
  };

  logo: {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    formats: {
      thumbnail: {
        url: string;
      };
      small: {
        url: string;
      };
    };
  };

  ranking: Array<{
    id: number;
    rank: string;
    rank_publisher: string;
    stream: string;
    year: string | null;
  }>;

  courses: Array<{
    id: number;
    course_title: string;
    course_fees: string;
    course_duration: string;
  }>;

  exams: Array<{
    id: number;
    title: string;
    slug: string;
    conducting_body: string;
    accepting_colleges: string;
    exam_type: string;
    exam_level: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;

  exams_accepted: Array<{
    id: number;
    title: string;
  }>;

  facilities: Array<{
    id: number;
    title: string;
  }>;

  highlights: Array<{
    id: number;
    key: string;
    value: string;
  }>;

  faq: Array<{
    id: number;
    question: string;
    answer: string;
  }>;

  streams: Array<{
    id: number;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;

  tabs: Array<{
    id: number;
    title: string;
  }>;

  seo: Array<any>;
  gallary: null | any;
}

export interface SearchSlotProps {
  index: number;
  selectedCollege: College | null;
  onSelect: (college: College) => void;
  onRemove: () => void;
}

export interface ComparisonTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface ComparisonTableProps {
  type: string;
  colleges: College[];
}

export interface SearchSlotProps {
  index: number;
  selectedCollege: College | null;
  onSelect: (college: College) => void;
  onRemove: () => void;
  allSelectedColleges: (College | null)[];
}
export interface NewsAttributes {
  id: number;
  title: string;
  slug: string;
  live: string | null;
  description: string | undefined;
  image: ImageAttributes;
  category: CategoryAttributes;
  recommendedArticle: string | null;
  createdAt: Date;
  createdBy: {
    id: number;
    firstname: string;
    lastname: string
  };
  publishedAt: Date;
  ckeditor_content: string;
}



export interface BlogListResponse {
  data: ArticleAttributes[];
}

export interface MetaSocialsProps {
  id: number;
  socialNetwork: string;
  title: string;
  description: string;
}

export interface SeoProps {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords?: string | null;
  metaRobots?: string | null;
  structuredData?: object | null;
  metaViewport?: string | null;
  canonicalURL?: string | null;
  metaImage: ImageAttributes | null;
  metaSocial: MetaSocialsProps[];
}

export interface CountryData {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  noOfStudentsStudying: string;
  seo: SeoProps;
}

export interface MetaProps {
  data: CountryData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ServerResponse {
  data: null | any;
  error?: {
    status: number;
    name: string;
    message: string;
    details: {
      errors: Array<{
        path: string[];
        message: string;
        name: string;
      }>;
    };
  };
}

interface mode {
  id: number;
  title: string;
  slug: string;
}
interface ownership {
  id: number;
  title: string;
  slug: string;
}
export interface streams {
  id: number;
  title: string;
  slug: string;
  broucher: any;
  streamIcon: ImageAttributes;

}
interface duration {
  id: number;
  title: string;
  slug: string;
}
export interface indian_state {
  id: number;
  title: string;
  slug: string;
}

interface exams {
  id: number;
  title: string;
  slug: string;
  fullForm: string;
  description: string;

}

export interface UniversityProfile {
  backgroundImage: ImageAttributes;
  fees: string;
  avgPackage: string;
  description: string;
  profileImage: ImageAttributes
}
// export interface UniRanking {
//   // data:{
//   //   id:number
//   //   ranking:{
//   //   id:number
//   //   rankingNumber:string
//   //   rankings:{
//   //     id:number
//   //     publisherName:string
//   //   }
//   // }[]
//   // }[]
// }

export interface ranking {
  rankingYear: Date;
  id: number;
  rankingNumber: number;
  stream: { id: number; slug: string };
  rankingPublisher: { id: number; slug: string; publisherImage: ImageAttributes };
}
export interface courseRanking {
  rankingYear: Date;
  id: number;
  rankingNumber: number;
  stream: { id: number; slug: string };
  rankingPublisher: { id: number; slug: string; publisherImage: ImageAttributes };
  course: {

    id: number;
    slug: string;
    title: string

  }
}


export interface University {
  title?: string;
  id: number;
  city: {
    title: string,
  },
  accreditation: string,
  exams_accepted: [
    {
      id: number;
      title: string;
    }
  ]
  avg_package: string,
  slug: string;
  fees: string,
  universityProfile: UniversityProfile;
  ownership?: ownership;
  indian_state?: indian_state;
  stream?: streams;
  searchableImage: ImageAttributes;
  mode?: mode;
  exams?: exams;
  applicationDate: string;
  examinationDate: string;
  resultDate: string;
  duration: duration;
  UniRank: any;
  fullForm?: string;
  description?: string;
  courseFullForm?: string;
  durationYear?: number;
  rankingStreams: ranking[];
  rankingCourses: courseRanking[];
  universities: University[];
  collegeCourseManager: collegeCourseManager[];
  rankingNumber: string
  rankingPublisher: string
  rankingYear: Date
  pubisherImg: string
  exam_type: string;
  exam_level: string;
  conducting_body: string;
  accepting_colleges: string;
  total_applications: string;
  highlights: {
    id: number;
    key: string;
    value: string;
  }[]
  sections: {
    id: number;
    title: string;
    content: string;
  }[]
  tabs: {
    sections: {
      id: number;
      title: string;
      content: string;
    }[]
  }[]

  average_duration: string
  average_fees: string
}



export interface UniversitiesData {
  data: University[];
  meta: any;
}

export interface SearchParamsProps {
  streamsParam?: string;
  courseParam?: string;
  durationParam?: string;
  locationsParam?: string;
  examsParam?: string;
  ownershipsParam?: string;
  modesParam?: string;
  cityParam?: string;
  query?: string;
  page?: number;
  rankingParam?: string;
  ownership?: string;
  state?: string;
  city?: string;
}

export interface searchParamUserId {
  searchParams: {
    dh: string;
  };
}

export interface UserType {
  ok: boolean;
  data: {
    last_phone_update: Date | null;
    id: number;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    job: string | null;
    createdAt: string;
    updatedAt: string;
    fullName: string;
    lastName: string;
    username: string;
    phone: string;
    verified: boolean;
    last_otp_request: any | null;
    resend_attempts: number | null;
    otp_session: string | undefined;
    gender: string | undefined | null
    town: string | undefined | null
    district: string | undefined | null
    state: string | undefined | null
    fullname: string;
    error:
    | {
      status: number;
      name: string;
      message: string;
      details: object;
    }
    | unknown;
  } | null;
  error: unknown;
}
//types for extended image

import {
  OnLoadingComplete,
  PlaceholderValue,
} from "next/dist/shared/lib/get-img-props";

export interface IImageExtended
  extends Omit<
    React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
    "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"
  >,
  React.RefAttributes<HTMLImageElement | null> {
  src: string;
  alt: string;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  fill?: boolean | undefined;
  loader?: undefined;
  quality?: number | `${number}` | undefined;
  priority?: boolean | undefined;
  loading?: "eager" | "lazy" | undefined;
  placeholder?: PlaceholderValue | undefined;
  blurDataURL?: string | undefined;
  unoptimized?: boolean | undefined;
  onLoadingComplete?: OnLoadingComplete | undefined;
  layout?: string | undefined;
  objectFit?: string | undefined;
  objectPosition?: string | undefined;
  lazyBoundary?: string | undefined;
}

export interface recentlyViewed {
  slug: string;
  image?: string;
  title: string;
}
export interface rankingFilter {
  data: {
    id: number;
    publisherName: string;
    slug: string;
  }[];
}

export interface FilterParams {
  streamsParam?: string;
  locationsParam?: string;
  examsParam?: string;
  ownershipsParam?: string;
  rankingParam?: string;
  courseParam?: string;
  cityParam?: string;
}

type Specialization = {
  id: number;
  title: string;
  fullFrom: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type Exam = {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  fullForm: string;
  description: string;
};

type Spzm = {
  id: number;
  fees: string;
  cutoff: number;

  specialization: Specialization;
  entrance_exam: Exam;
};

type Course = {
  id: number;
  title: string;
  slug: string;
  durationYear: number;
  courseFullForm: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type collegeCourseManager = {
  id: number;
  eligibility?: string;
  applicationDate: {
    id: number
    startDate: string;
    endDate: string;
  };
  fees: string | null;
  spzm: Spzm[];
  course: Course;
};


export type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export interface SeoImage {
  url: string;
  alt?: string;
}

export interface SocialSeos {
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: SeoImage;
  };
  // Add other social platforms as needed
}

export interface Seo {

  canonicalURL?: string;
  keywords?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: SeoImage;
  metaRobots?: string;
  socialSeos?: SocialSeos;

}
interface course {
  id: number;
  title: string;
  slug: string;
}
export interface courses {
  data: course[];
}


type City = {
  id: number;
  title: string;
};



type Ranking = {
  id: number;
  rank: string;
  rank_publisher: string;
  stream: string;
};

export type ExamAccepted = {
  id: number;
  title: string;
};

export type Institution = {
  id: number;
  title: string;
  slug: string;
  fees: string;
  accreditation: string;
  avg_package: string;
  description: string | null;
  createdAt: string | null;
  updatedAt: string;
  publishedAt: string;
  city: City;
  indian_state: City;
  logo?: ImageAttributes;
  ranking: Ranking[];
  exams_accepted: ExamAccepted[];
};

