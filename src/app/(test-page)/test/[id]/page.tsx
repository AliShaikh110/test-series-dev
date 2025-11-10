import QuizInterface from "@/components/quiz-interface/quiz-interface";
import React from "react";
import { fetchCachedData } from "../../../../utils/utils";

export default async function TestTemplate({ params }: { params: { id: number } }) {
  const {id}= await params
    const paperQuery = `/items/papers?fields=*&filter[id][_eq]=${id}&fields=questions.*&fields=questions.options.*`;
    const paperData = await fetchCachedData(paperQuery);
    console.log(paperData)
  return (
    <>
      <QuizInterface  data={paperData.data[0]} />
    
    </>
  );
}
