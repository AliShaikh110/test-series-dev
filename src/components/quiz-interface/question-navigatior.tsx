/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "@/components/ui/card";

interface AnsProp {
  questionId: number;
  selectedOptionId?: number;
  status: string;
  subject_id?: number;
}

interface QuestionNavigatorProps {
  data: any;
  currentQuestion: number;
  answers: Record<number, number>;
  getQuestionStatus: (id: number, subject: { subjectIndex: number; questionIndex1: number }) => string;
  setCurrentQuestion: (index: number) => void;
  setShowQuestionGrid: (show: boolean) => void;
  finalans: AnsProp[];
  groupedData: {
    subject_tag: string;
    questions: any[];
  }[];
  subjectInfo: {
    subjectIndex: number;
    questionIndex1: number;
  };
  setSubjectInfo: React.Dispatch<
    React.SetStateAction<{ subjectIndex: number; questionIndex1: number }>
  >;
  closeDrawer?: () => void;
}

export default function QuestionNavigator({
  setCurrentQuestion,
  finalans,
  groupedData,
  subjectInfo,
  setSubjectInfo,
}: QuestionNavigatorProps) {

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-md">
      {/* Header */}
      <div className="border-b px-1 py-1 font-semibold text-gray-800  bg-gray-100">
        Question Status
      </div>

      {/* Status Legend */}
      <div className="px-2 py-3">
        <div className="flex justify-between items-center text-xs text-gray-700 mb-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            Answered
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            Flagged
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            Unanswered
          </div>
        </div>
      </div>

      {/* Question Grid */}
      <div className="px-2 pb-3">
        <div className="grid grid-cols-5 md:grid-cols-5 gap-2">
          {groupedData[subjectInfo.subjectIndex].questions.map((q, index) => {
            const answerObj = finalans.find(
              (a) => a.questionId === q.id && a.subject_id === subjectInfo.subjectIndex
            );

            const status = answerObj?.status || "unanswered";
            const isActive = subjectInfo.questionIndex1 === index;

            const statusClass = (() => {
              switch (status) {
                case "answered":
                  return "bg-green-500 border-green-600 text-white hover:bg-green-600";
                case "flagged":
                  return "bg-yellow-400 border-yellow-500 text-white hover:bg-yellow-500";
                default:
                  return "bg-white border-gray-300 text-gray-700 hover:bg-gray-100";
              }
            })();

            return (
              <button
                key={q.id}
                onClick={() => {
                  setSubjectInfo({ subjectIndex: subjectInfo.subjectIndex, questionIndex1: index });
                  setCurrentQuestion(index);
                }}
                className={`w-full aspect-square rounded-md text-sm font-semibold border flex items-center justify-center shadow-sm transition-colors duration-200 ${isActive ? "ring-2 ring-blue-500 ring-offset-1" : ""
                  } ${statusClass}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}