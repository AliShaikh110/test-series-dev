import Instructions from "@/components/instructions";
import React from "react";
import { fetchCachedData } from "@/utils/utils";

export default async function InstructionsTemplate({ params }: { params: { id: number } }) {
  const {id}= await params
    const paperQuery = `/items/papers?fields=*&filter[id][_eq]=${id}&fields=questions.*&fields=questions.options.*`;
    const paperData = await fetchCachedData(paperQuery);

  return (
    <>
      <Instructions data={paperData.data[0]} />
    </>
  );
}