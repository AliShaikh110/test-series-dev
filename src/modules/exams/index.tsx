"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  data: {
    id: number;
    category_name: string;
    exams?: {
      id: number;
      exam_name: string;
    }[];
  }[];
}

const ExamSection = ({ data }: Props) => {
  return (
    <div>
      <div id="courses-section" className="mx-auto max-w-2xl py-16 sm:py-36 lg:max-w-7xl">
        <div className="sm:flex justify-between items-center pb-12">
          <h2 className="text-center text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white pb-1 line-clamp-none md:text-4xl lg:text-5xl font-sans relative z-20 my-4">
            Popular Exams
          </h2>
          <div>
            <button className="bg-transparent hover:bg-purple text-purple font-medium py-3 px-4 border border-purple hover:border-black rounded">
              Explore More Exams
            </button>
          </div>
        </div>

        {/* ✅ Fixed Tabs structure */}
        <Tabs defaultValue={data[0]?.category_name || ""} className="p-3 gap-x-4">
          <ScrollArea className="w-full overflow-x-auto rounded-md border shadow-md">
            <TabsList className="text-lg">
              {data.map((category) => (
                <TabsTrigger key={category.id} value={category.category_name}>
                  {category.category_name}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {data.map((category) => (
            <TabsContent key={category.id} value={category.category_name}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-3 gap-x-3">
                {category.exams?.map((exam) => (
                  <div
                    key={exam.id} // ✅ Key should be here
                    className="shadow-md transition-all hover:shadow-lg hover:scale-[1.01] cursor-pointer w-full px-3 py-6 border rounded-md flex justify-between items-center"
                  >
                    <Link href={`/papers/${exam.id}`}>
                      <div className="flex items-center gap-x-2">
                        <Image
                          src="https://cdn.testbook.com/resources/production/test_series/Indian%20Railways_All_1583407036.png"
                          alt="exam-avatar"
                          height={100}
                          width={100}
                          className="rounded-full h-10 w-10"
                        />
                        <p className="text-lg font-semibold">{exam.exam_name}</p>
                      </div>
                      <ChevronRight />
                    </Link>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ExamSection;
