export const newsListQuery =
  "/api/news?populate[createdBy][populate]=true&fields[0]=title&fields[1]=slug&fields[2]=live&fields[3]=description&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=formats&populate[image][fields][3]=blurhash&populate[category][fields][0]=name&fields[4]=publishedAt&sort[6]=publishedAt:desc";

export const latestNews =
  "/api/news?populate=*&pagination[limit]=8&sort[0]=publishedAt:desc";

export const halfBlogQuery =
  "&fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=ckeditor_content&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=formats&populate[image][fields][3]=blurhash&populate[news][fields][0]=title&populate[news][fields][1]=description&populate[news][fields][2]=live&populate[news][populate][image][fields][0]=url&populate[news][populate][image][fields][1]=alternativeText&populate[news][populate][image][fields][2]=blurhash&populate[news][populate][image][fields][3]=formats&populate[news][fields][3]=slug&fields[4]=publishedAt&populate[news][fields][5]=createdBy";

 export const getCourseListQuery = (streamSlug: string) => {
  
  return `/api/coursees?populate[streams][populate]=true&populate[duration][populate]=true&populate[universities][populate]=true&filters[streams][slug][$eq]=${streamSlug}`
};

 export const getExamsListQuery = (streamSlug: string) => {
  return `/api/exams?populate[stream][populate]=true&fields[0]=exam_type&fields[1]=exam_level&fields[2]=conducting_body&fields[3]=title&fields[4]=accepting_colleges&fields[5]=total_applications&fields[6]=slug&populate[highlights][filters][key][$eq]=Short+Exam+Name&populate[highlights][filters][key][$eq]=Full+Exam+Name&populate[sections][filters][title][$eq]=About&filters[stream][slug][$eq]=${streamSlug}`;
};


export const getUniListQuery = (streamSlug: string) => {

  return `/api/universityys?fields[0]=title&fields[1]=slug&populate[city][fields][0]=title&populate[indian_state][fields][0]=title&populate[ranking][fields][0]=rank&populate[ranking][fields][1]=rankpublisher&fields[2]=fees&fields[3]=accreditation&populate[stream][populate]=true&populate[logo][populate]=true&fields[4]=avg_package&fields[5]=ownership&fields[6]=description&populate[tabs][populate][sections][filters][title][$contains]=About&populate[exams_accepted][populate]=true&filters[streams][slug][$eq]=${streamSlug}`;
};


