/* eslint-disable @typescript-eslint/no-explicit-any */
// Common interfaces
export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
}

export interface SearchableImage {
  id: number;
  url: string;
  alternativeText: null | string;
  blurhash: null | string;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
}

// First data structure
export interface UniversityData1 {
  id: number;
  title: string;
  slug: string;
  fullForm: string;
  searchableImage: SearchableImage;
  universityProfile: {
    id: number;
    description: string;
    fees: number;
    avgPackage: string;
    location: string;
  };
  ownership: { id: number; title: string };
  indian_state: { id: number; title: string };
  entrance_exams: {
    data: Array<{ id: number; title: string }>;
  };
}

// Second data structure
export interface UniversityData2 {
  university_id: number;
  university_name: string;
  ranking_stream_id: number;
  university_slug: string;
  university_fullform: string;
  ranking_number: number;
  ranking_year: string;
  description: string;
  ranking_publisher: string;
  ranking_publisher_slug: string;
  stream_title: string;
  stream_slug: string;
  image_url: string;
  indian_state_name: string;
  ownership_name: string;
  fees: string;
  avg_package: string;
  ranking_publisher_image_url: string;
}

// Normalized data structure
export interface NormalizedUniversity {
  id: number;
  slug: string;
  fullForm: string;
  searchableImage: {
    url: string;
    blurhash: string | null;
  };
  indian_state: {
    title: string;
  };
  ownership: {
    title: string;
  };
  universityProfile: {
    description: string;
    fees: number | string;
    avgPackage: string;
  };
}

// Props for FilteredUniversityItem component
export interface FilteredProps {
  university: NormalizedUniversity;
  user: any; // Replace 'any' with a more specific type if available
  jwt: string;
}