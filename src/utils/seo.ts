// utils/seo.ts
import { Seo } from "@/types/types";
import { Metadata } from "next";

export function createMetadata(data: Seo): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://admin.onlyeducation.co.in";
  return {
    title: data.metaTitle || "Only Education | Choose one wisely",
    description:
      data.metaDescription ||
      "Learn how to choose the right college with Education's comprehensive guide",
    keywords: data.keywords,
    alternates: {
      canonical: data.canonicalURL,
    },
    openGraph: {
      title: data.metaTitle || "Only Education | Choose one wisely",
      description:
        data.metaDescription ||
        "Learn how to choose the right college with Education's comprehensive guide",
      url: data.canonicalURL || baseUrl,
      images: [
        {
          url: data.metaImage?.url
            ? new URL(data.metaImage.url, baseUrl).toString()
            : `${baseUrl}/uploads/only_education_f_logo_2_b4d4bc1c95.png`,
          alt: data.metaImage?.alt || "Only Education",
        },
      ],
      siteName: "Only Education",
      // Add more Open Graph properties if needed
    },
    robots: data.metaRobots || "index, follow",
    // twitter: seo.socialSeos?.twitter
    //   ? {
    //       card: seo.socialSeos.twitter.card || "summary_large_image",
    //       site: seo.socialSeos.twitter.site,
    //       creator: seo.socialSeos.twitter.creator,
    //       title: seo.socialSeos.twitter.title || seo.metaTitle,
    //       description: seo.socialSeos.twitter.description || seo.metaDescription,
    //       images: seo.socialSeos.twitter.image
    //         ? [new URL(seo.socialSeos.twitter.image.url, baseUrl).toString()]
    //         : [`${baseUrl}/uploads/only_education_f_logo_2_b4d4bc1c95.png`],
    //     }
    //   : undefined,
    // Add other social platforms as needed
  };
}
