/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeftIcon, ChevronRightIcon, Flag } from "lucide-react";
import QuizProgress from "./progess-bar";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

interface AnsProp {
  questionId: number;
  selectedOptionId?: number;
  status: string;
  subject_id?: number;
}

interface QuestionPanelProps {
  questions: any[];
  answers: Record<number, number>;
  handleAnswerSelect: (args: {
    status: string;
    textAnswer?: number;
    optionId?: number;
    subject_tag?: string;
    questionId: number;
    subject_id?: number;
  }) => void;
  getQuestionStatus: (id: number, subject: { subjectIndex: number; questionIndex1: number; }) => string;
  examData: {
    positive: number;
    negative: number;
    paper_title: string;
  };
  setSubmit: (val: boolean) => void;
  subjectInfo: {
    subjectIndex: number;
    questionIndex1: number;
  };
  setSubjectInfo: React.Dispatch<React.SetStateAction<{
    subjectIndex: number;
    questionIndex1: number;
  }>>;
  currentQuestion: number;
  setCurrentQuestion: (index: number) => void;
  groupedData: {
    subject_tag: string;
    questions: any[];
  }[];
  setFlag: Dispatch<SetStateAction<boolean>>;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  submit: boolean;
  setAllData: Dispatch<SetStateAction<any>>;
  finalans: AnsProp[];

}

export default function QuestionPanel({
  questions,
  answers,
  handleAnswerSelect,
  getQuestionStatus,
  examData,
  setSubmit,
  subjectInfo,
  setSubjectInfo,
  currentQuestion,
  setCurrentQuestion,
  groupedData,
  setFlag,
  setIsSubmitted,
  submit,
  finalans
}: QuestionPanelProps) {
  const [, setId] = useState(0);
  const [textAnswer, setTextAnswer] = useState<number | undefined>();

  const currentSubject = groupedData[subjectInfo.subjectIndex];
  const currentQuestionData = currentSubject.questions[subjectInfo.questionIndex1];

  useEffect(() => {
    if (currentQuestionData?.id) {
      setTextAnswer(answers[currentQuestionData.id]);
    }
  }, [currentQuestionData?.id, answers]);

  const handleNext = () => {
    console.log(textAnswer)
    if (textAnswer !== undefined) {
      handleAnswerSelect({
        status: "answered",
        textAnswer,
        subject_tag: currentQuestionData.subject_tag,
        questionId: currentQuestionData.id,
        subject_id: subjectInfo.subjectIndex,
      });
      setTextAnswer(undefined);
    }

    const nextIndex = subjectInfo.questionIndex1 + 1;
    if (nextIndex < currentSubject.questions.length) {
      setSubjectInfo({
        subjectIndex: subjectInfo.subjectIndex,
        questionIndex1: nextIndex,
      });
      setCurrentQuestion(nextIndex);
    } else if (subjectInfo.subjectIndex < groupedData.length - 1) {
      setSubjectInfo({
        subjectIndex: subjectInfo.subjectIndex + 1,
        questionIndex1: 0,
      });
      setCurrentQuestion(0);
    }
  };

  const handlePrev = () => {
    if (subjectInfo.questionIndex1 > 0) {
      setSubjectInfo({
        subjectIndex: subjectInfo.subjectIndex,
        questionIndex1: subjectInfo.questionIndex1 - 1,
      });
      setCurrentQuestion(subjectInfo.questionIndex1 - 1);
    } else if (subjectInfo.subjectIndex > 0) {
      const prevSubject = groupedData[subjectInfo.subjectIndex - 1];
      setSubjectInfo({
        subjectIndex: subjectInfo.subjectIndex - 1,
        questionIndex1: prevSubject.questions.length - 1,
      });
      setCurrentQuestion(prevSubject.questions.length - 1);
    }
  };

  const isLastQuestion =
    subjectInfo.subjectIndex === groupedData.length - 1 &&
    subjectInfo.questionIndex1 === groupedData[groupedData.length - 1].questions.length - 1;

  useEffect(() => {
    if (submit === false) return;
    setFlag(true);
    setIsSubmitted(true);

    if (document.fullscreenElement) {
      document.exitFullscreen()
        .catch((err) => {
          console.error("Error exiting full screen:", err);
        });
    }
  }, [submit]);

  const answeredCount = finalans.length;

  return (
    <div className="w-full mt-3">
      {/* Subject Tabs */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 px-2 mb-4 bg-white-900 border border-gray-300 rounded-md shadow-sm">
        {/* Subject Tabs */}
        <div className="w-full items-center lg:w-auto flex flex-wrap gap-2">
          <div>SECTIONS -</div>
          {groupedData.map((subject, idx) => (
            <Button
              key={subject.subject_tag}
              variant={idx === subjectInfo.subjectIndex ? "outline" : "link"}
              onClick={() => {
                setSubjectInfo({ subjectIndex: idx, questionIndex1: 0 });
                setCurrentQuestion(0);
              }}
              className={`
          ${idx === subjectInfo.subjectIndex ? 'text-orange-700 ' : ' text-black'}`}
            >
              {subject.subject_tag}
            </Button>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="lg:w-auto ">
          <QuizProgress
            answeredCount={answeredCount}
            totalQuestions={questions.length}
          />
        </div>
      </div>



      {/* Question Card */}
      <Card className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionData?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-9 border-b pb-3">
              <Badge variant="outline">
                Q{subjectInfo.questionIndex1 + 1} of {currentSubject.questions.length} - {currentSubject.subject_tag}
              </Badge>
              <div className="flex gap-2 items-center">
                <Badge className="bg-green-500 text-white px-3 py-1">+{examData.positive}</Badge>
                <Badge className="bg-red-500 text-white px-3 py-1">-{examData.negative}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleAnswerSelect({
                      status: "flagged",
                      subject_tag: currentQuestionData.subject_tag,
                      questionId: currentQuestionData.id,
                      subject_id: subjectInfo.subjectIndex,

                    });
                  }}
                  className={`gap-2 text-sm font-medium border px-3 py-1 rounded-md transition-all duration-200 ${getQuestionStatus(currentQuestion, subjectInfo) === "flagged"
                    ? "text-yellow-600 border-yellow-400 bg-yellow-100"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  <Flag className="h-4 w-4" />
                  {getQuestionStatus(currentQuestion, subjectInfo) === "flagged" ? "Flagged" : "Mark as flag"}
                </Button>
              </div>
            </div>

            {/* Question Text */}
            <h2 className="text-base font-medium text-gray-800 mb-8 leading-relaxed">
              {currentQuestionData?.question_detail}
            </h2>

            {/* Options or Input */}
            <div className="space-y-3">
              {currentQuestionData?.question_type === "MCQ"
                ? currentQuestionData.options.map((option: any, index: number) => (
                  <div
                    key={option.id}
                    onClick={() => {
                      setId(option.id);
                      handleAnswerSelect({
                        status: "answered",
                        optionId: option.id,
                        subject_tag: currentQuestionData.subject_tag,
                        questionId: currentQuestionData.id,
                        subject_id: subjectInfo.subjectIndex,
                      });
                    }}
                    className={`p-4  rounded-md border text-sm cursor-pointer transition duration-200 flex items-start gap-3 ${answers[currentQuestionData.id] === option.id
                      ? "bg-blue-100 border-blue-500"
                      : " hover:border-blue-400 hover:bg-blue-50"
                      }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${answers[currentQuestionData.id] === option.id
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 border border-gray-400"
                        }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="text-gray-800">
                      {option.option}
                    </div>
                  </div>
                ))
                : (
                  <Input
                    placeholder="Enter your answer"
                    value={textAnswer !== undefined ? textAnswer : ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      const parsed = parseFloat(val);
                      setTextAnswer(!isNaN(parsed) ? parsed : undefined);
                    }}
                    onKeyDown={(e) => {
                      const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
                      const isAllowedChar = /^[0-9.+-]$/.test(e.key);
                      if (!isAllowedChar && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="mt-3 text-sm"
                  />
                )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-300 bg-gray-50">
          <Button
            variant="outline"
            disabled={subjectInfo.subjectIndex === 0 && subjectInfo.questionIndex1 === 0}
            onClick={handlePrev}
            className="px-6 py-2 text-sm"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-2" /> Previous
          </Button>

          {isLastQuestion ? (
            <Button onClick={() => setSubmit(true)} className="bg-green-600 text-white hover:bg-green-700 px-6 py-2 text-sm">
              Submit
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 text-sm">
              Next <ChevronRightIcon className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}