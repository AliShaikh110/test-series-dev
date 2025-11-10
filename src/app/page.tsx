import { BentoGridThirdDemo } from "@/modules/benefits";
import { Hero } from "@/modules/hero";
import Tabs from "@/modules/exams";
import Testemonials from "@/modules/testemonials";
import Footer from "@/modules/footer";
import { fetchCachedData } from "../../utils/utils";
import Exams from "@/components/exams"
import PreviousYearPapers from "@/components/PreviousYearPapers";

export default async function Home() {
  const categoryQuery=`/items/category?fields=*,exams.*,exams.papers_test.*,exams.papers_test.papers_id.*`
const categoryData = await fetchCachedData(categoryQuery);
  return (
    <div className="font-[family-name:var(--font-geist-sans)] max-w-6xl mx-auto">
      <Hero />
      <BentoGridThirdDemo  />
      <Exams data={categoryData.data} />
      <PreviousYearPapers />

      <Testemonials />
      <Footer />
    </div>
  );
}
