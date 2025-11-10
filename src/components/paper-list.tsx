"use client"

import Link from 'next/link';
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText } from "lucide-react";

interface Props {
  examData: {
    id: number,
    exam_name: string,
    papers_test: {
      exams_id: number,
      id: number,
      papers_id: {
        id: number,
        paper_title: string,
        status: string,
        questions: {
          id: number,
          question_title: string,
          question_detail: string,
          solution: string,
          hint: string,
          correct_option: string,
          options: {
            option: string,
            id: number
          }[]
        }[]
      }
    }[]
  }
}

function openFullScreen() {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
}

const Paperlist = ({ examData }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          {examData.exam_name} Test
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {examData.papers_test.map((paper: any) => {
            const questionsCount = paper.papers_id.questions?.length || 0;

            return (
              <Link href={`/test-instructions/${paper.papers_id.id}`} key={paper.id}>
                <Card
                  onClick={openFullScreen}
                  className="group h-full transition-shadow hover:shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="mb-4 space-y-2">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600">
                          {paper.papers_id.paper_title}
                        </h2>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <FileText size={16} className="mr-2" />
                          <span>{questionsCount} Questions</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Clock size={16} className="mr-2" />
                          <span>2 minutes per question</span>
                        </div>
                      </div>

                      <div className="mt-auto flex justify-between items-center">
                        <Badge
                          variant="outline"
                          className={`rounded-full px-3 py-1 text-xs font-medium ${paper.papers_id.status === "published"
                            ? "bg-green-100 text-green-800 dark:bg-green-800/10 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/10 dark:text-yellow-400"
                            }`}
                        >
                          {paper.papers_id.status}
                        </Badge>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Total time: {questionsCount * 2} mins
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Paperlist;
