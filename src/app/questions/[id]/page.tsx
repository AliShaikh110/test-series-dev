import QuizClient from "@/components/ui/quiz";
import { fetchCachedData } from "../../../../utils/utils";

export default async function QuizPage({ params }: { params: { id: number } }) {
  const questionQuery = `/items/questions?fields=id,question_title,question_detail,solution,hint,correct_option,options.*&filter[paper_id][_eq]=${params.id}`;
  const questionData = await fetchCachedData(questionQuery);

  return <QuizClient questions={questionData.data} />;
}
