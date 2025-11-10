export const blogListQuery =
  "/api/articles?fields[0]=title&fields[1]=slug&fields[3]=description&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=formats&populate[image][fields][3]=blurhash&fields[4]=publishedAt&populate[categories][fields][0]=name&sort[6]=publishedAt:desc";

export const latestNews =
  "/api/articles?populate=*&pagination[limit]=7&sort[0]=createdAt:desc";

export const category = "/api/categories?fields[0]=slug&fields[1]=name&populate[articles][fields][0]=title&filters[articles][$notNull]=true";

export const halfBlogQuery =
  "&fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=ckeditor_content&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=formats&populate[image][fields][3]=blurhash&populate[articles][fields][0]=title&populate[articles][fields][1]=description&populate[articles][fields][2]=live&populate[articles][populate][image][fields][0]=url&populate[articles][populate][image][fields][1]=alternativeText&populate[articles][populate][image][fields][2]=blurhash&populate[articles][populate][image][fields][3]=formats&populate[articles][fields][3]=slug&fields[4]=publishedAt";
