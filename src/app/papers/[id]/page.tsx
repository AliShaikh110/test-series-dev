import React from "react";
import { fetchCachedData } from "../../../../utils/utils";
import Paperlist from "@/components/paper-list";

// ✅ This function should be at the top level, outside of the component
export async function generateStaticParams() {
  const papers = await fetchCachedData("/items/category?fields=id");

  return papers.data.map((paper: { id: number }) => ({
    id: paper.id.toString(), // ✅ Convert to string for Next.js
  }));
}

export default async function ExamPapersPage({
  params,
}: {
  params: { id: string }; 
}) {
  const {id} = await params;

  const paperQuery = `/items/category?fields=id,status,category_name,exams.id,exams.exam_name,exams.papers_test.*,exams.papers_test.papers_id.*&filter[exams][id][_eq]=${id}&deep[exams][_filter][id][_eq]=${id}`;
  const paperData = await fetchCachedData(paperQuery);

  const examData = paperData.data[0]?.exams[0];

  if (!examData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-500">No exam data found</p>
      </div>
    );
  }

  return (
    <div>
      <Paperlist examData={examData} />
    </div>
  );
}
