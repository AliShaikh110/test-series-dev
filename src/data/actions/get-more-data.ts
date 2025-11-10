"use server";

// import { blogListQuery } from "@/app/data/quries/articles-query";
import { fetchPaginatedList } from "@/utils/utils";
import {
  getCourseListQuery,
  getExamsListQuery,
  getUniListQuery,
  newsListQuery,
} from "../quries/news-query";

export async function getMoreArticleData(page: number) {
  const { data, hasMore } = await fetchPaginatedList("/api/articles?fields[0]=title&fields[1]=slug&fields[3]=description&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=formats&populate[image][fields][3]=blurhash&fields[4]=publishedAt&populate[categories][fields][0]=name&sort[6]=publishedAt:desc", page);
  return { data, hasMore };
}
export async function getMoreNewsData(page: number) {
  const { data, hasMore } = await fetchPaginatedList(newsListQuery, page);
  return { data, hasMore };
}
export async function getMoreCourseData(page: number, streamSlug: string) {
  const courseListQuery = getCourseListQuery(streamSlug);
  const { data, hasMore } = await fetchPaginatedList(courseListQuery, page);
  return { data, hasMore };
}
export async function getMoreExamsData(page: number, streamSlug: string) {
  const examsListQuery = getExamsListQuery(streamSlug);
  const { data, hasMore } = await fetchPaginatedList(examsListQuery, page);
  return { data, hasMore };
}


export async function getMoreUnivData(page: number, streamSlug: string) {


  const UniListQuery = getUniListQuery(streamSlug);
  const { data, hasMore } = await fetchPaginatedList(UniListQuery, page);
  return { data, hasMore };
}