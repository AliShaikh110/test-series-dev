"use client"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Users, Award, CheckCircle2, ArrowRight, BookOpen } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Props {
  data: {
    id: number;
    category_name: string;
    exams?: {
      id: number;
      exam_name: string;
      tests: number;
      students: string;
      color: string;
    }[];
  }[];
}

const Exams = ({ data }: Props) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Check if data exists and has items
  if (!data || data.length === 0) {
    return (
      <section className="py-16 container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Popular Exam Categories
          </h2>
          <p className="text-muted-foreground max-w-[800px] mx-auto">
            Get exam-ready with concepts, questions, and study notes as per the latest pattern
          </p>
        </div>

        <div className="py-16 bg-gray-50 rounded-xl text-center">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No exam categories available</h3>
          <p className="text-muted-foreground">Check back later for updates.</p>
        </div>
      </section>
    );
  }

  // Safely get the default tab value
  const defaultTabValue = data.length > 0 ? data[0].category_name : "";

  // Map color strings to actual Tailwind classes to avoid dynamic class issues
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, bgLight: string, text: string, border: string }> = {
      primary: { bg: "bg-primary-100", bgLight: "bg-primary-50", text: "text-primary-600", border: "border-primary-200" },
      blue: { bg: "bg-blue-100", bgLight: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
      green: { bg: "bg-green-100", bgLight: "bg-green-50", text: "text-green-600", border: "border-green-200" },
      red: { bg: "bg-red-100", bgLight: "bg-red-50", text: "text-red-600", border: "border-red-200" },
      purple: { bg: "bg-purple-100", bgLight: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
      yellow: { bg: "bg-yellow-100", bgLight: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200" },
      orange: { bg: "bg-orange-100", bgLight: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
      indigo: { bg: "bg-indigo-100", bgLight: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
      pink: { bg: "bg-pink-100", bgLight: "bg-pink-50", text: "text-pink-600", border: "border-pink-200" },
      teal: { bg: "bg-teal-100", bgLight: "bg-teal-50", text: "text-teal-600", border: "border-teal-200" }
    };

    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="bg-gray-50">
      <section className="py-28 container">

        <div className="  py-16 px-4 sm:py-0  flex   flex-col  gap-y-4 mb-6 text-center">
          <h3 className=" text-4xl font-bold tracking-tight bg-clip-text text-transparent  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white pb-1  line-clamp-none md:text-4xl lg:text-5xl font-sans  relative z-20   my-0">
            All Top Entrance Exams
          </h3>
          <p className="text-lg font-medium text-gray-500 text-center">
            Explore trending test series across Engineering, Medical, Management & Technology.
          </p>
        </div>

        {/* <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 px-3 py-1 bg-primary-50 text-primary-600 border-primary-200 rounded-full">
          Prepare with confidence
        </Badge>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          Popular Exam Categories
        </h2>
        <p className="text-muted-foreground max-w-[800px] mx-auto">
          Get exam-ready with concepts, questions, and study notes as per the latest pattern
        </p>``
      </div> */}

        <Tabs defaultValue={defaultTabValue} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-10 bg-transparent max-w-4xl mx-auto">
            {data.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.category_name}
                className="rounded-full px-6 py-2 border font-medium data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md capitalize transition-all duration-300"
              >
                {category.category_name}
              </TabsTrigger>
            ))}
          </TabsList>

          {data.map((category) => (
            <TabsContent key={category.id} value={category.category_name} className="space-y-4 overflow-hidden">
              {category.exams && category.exams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Show first 7 cards if there are more than 8 exams */}
                  {category.exams.slice(0, category.exams.length > 8 ? 7 : 8).map((exam) => {
                    const colorClasses = getColorClasses(exam.color);
                    const isHovered = hoveredCard === exam.id;

                    return (
                      <Link href={`/papers/${exam.id}`} key={exam.id} >

                        <Card

                          className={`bg-blue-100 overflow-hidden border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ${isHovered ? "transform -translate-y-1" : ""}`}
                          onMouseEnter={() => setHoveredCard(exam.id)}
                          onMouseLeave={() => setHoveredCard(null)}
                        >
                          <CardContent className="p-0 h-full">
                            <div className={`${colorClasses.bgLight} p-6 flex items-start gap-4 relative overflow-hidden h-28`}>
                              <div className={`${colorClasses.bg} rounded-full p-3.5 z-10`}>
                                <Award className={`h-6 w-6 ${colorClasses.text}`} />
                              </div>
                              <div className="space-y-1.5 z-10">
                                <h3 className="font-bold text-xl">{exam.exam_name}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span>{exam.tests} Tests</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Users className="h-4 w-4" />
                                    <span>{exam.students}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Decorative elements */}
                              <div className={`absolute -right-10 -bottom-10 h-32 w-32 rounded-full ${colorClasses.bg} opacity-40 blur-md`}></div>
                              <div className={`absolute -right-5 -top-5 h-20 w-20 rounded-full ${colorClasses.bg} opacity-40 blur-md`}></div>
                            </div>
                            <div className="p-5 flex justify-between items-center bg-white">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={`bg-success-50 text-success-600 border-success-200 px-2.5 py-1 rounded-full bg-green-100`}>
                                  Trending
                                </Badge>
                              </div>
                              <Button
                                variant={isHovered ? "default" : "ghost"}
                                size="sm"
                                className={`gap-2 rounded-full px-4 ${isHovered ? "bg-primary text-white" : colorClasses.text}`}
                              >
                                View Details <ChevronRight className={`h-4 w-4 ${isHovered ? "animate-pulse" : ""}`} />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}

                  {/* Add "View All" card if there are more than 8 exams */}
                  {category.exams.length > 8 && (
                    <Card
                      className="overflow-hidden border border-dashed border-gray-200 rounded-xl hover:border-primary hover:bg-gradient-to-br hover:from-primary-50 hover:to-white transition-all duration-300 flex items-center justify-center cursor-pointer group"
                      onMouseEnter={() => setHoveredCard(-1)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <CardContent className="p-0 h-full w-full">
                        <div className="h-full flex flex-col items-center justify-center text-center p-6">
                          <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                            <ArrowRight className="h-8 w-8 text-primary-600 group-hover:text-white" />
                          </div>
                          <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">View All Exams</h3>
                          <p className="text-sm text-muted-foreground">
                            Explore all {category.exams.length} exams in this category
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="col-span-4 text-center py-16 bg-gray-50 rounded-xl">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No exams available</h3>
                  <p className="text-muted-foreground">Check back later for updates to this category.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
};

export default Exams;