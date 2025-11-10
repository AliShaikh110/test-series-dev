"use server";

import { blogListQuery } from "@/app/data/quries/articles-query";
import { fetchPaginatedList } from "@/utils/utils";
import {
  getCourseListQuery,
  getExamsListQuery,
  getUniListQuery,
  newsListQuery,
} from "../quries/news-query";

export async function getMoreArticleData(page: number) {
  const { data, hasMore } = await fetchPaginatedList(blogListQuery, page);
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


export async function getMoreUnivData(page:number,streamSlug:string){


  const UniListQuery = getUniListQuery(streamSlug);
  const {data,hasMore} = await fetchPaginatedList(UniListQuery,page);
  return {data, hasMore};
}