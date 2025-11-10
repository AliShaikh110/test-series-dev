/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Timer from "./timer";
import QuestionPanel from "./question-panel";
import QuestionNavigator from "./question-navigatior";
import Link from "next/link";
import { X } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerTitle
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";

type Option = {
  option: string;
  id: number;
};

type Question = {
  id: number;
  question_title: string;
  question_detail: string;
  solution: string;
  hint: string;
  correct_option: string;
  options: Option[];
  subject_tag?: string; // Added subject_tag property
};

interface QuizClientProps {
  data: {
    questions: Question[];
    Timer: number;
    marking_negative: string;
    marking_positive: string;
    paper_title: string; // Added paper_title property
  };
}

// Storage keys for session storage
const STORAGE_KEYS = {
  CURRENT_QUESTION: 'quiz_current_question',
  ANSWERS: 'quiz_answers',
  DARK_MODE: 'quiz_dark_mode',
  CURRENT_SUBJECT: 'quiz_current_subject',
};

type AnswerType = {
  questionId: number;
  selectedOptionId?: number;
  textAnswer?: number;
  status: string;
  subject_tag?: string;
  subject_id?: number;
};

export default function QuizInterface({ data }: QuizClientProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [, setShowQuestionGrid] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [flag, setFlag] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReEnterButton, setShowReEnterButton] = useState(false);
  const [submit, setSubmit] = useState(false)
  const [, setAllData] = useState<any[]>([])
  const [subjectInfo, setSubjectInfo] = useState({
    subjectIndex: 0,
    questionIndex1: 0
  })
  const [drawerOpen, setDrawerOpen] = useState(true);


  const groupedData = Object.entries(
    data.questions.reduce((acc, question) => {
      const subject = question.subject_tag || "General";

      if (!acc[subject]) acc[subject] = [];
      acc[subject].push(question);
      return acc;
    }, {} as Record<string, Question[]>)
  ).map(([subject_tag, questions]) => ({ subject_tag, questions }));

  // Load saved state on component mount
  useEffect(() => {
    // Only run once on initial mount
    if (!isInitialized) {
      // Load dark mode preference
      const savedDarkMode = sessionStorage.getItem(STORAGE_KEYS.DARK_MODE);
      if (savedDarkMode !== null) {
        setDarkMode(savedDarkMode === 'true');
      }

      // Load current question position
      const savedQuestionIndex = sessionStorage.getItem(STORAGE_KEYS.CURRENT_QUESTION);
      if (savedQuestionIndex !== null) {
        const questionIndex = parseInt(savedQuestionIndex, 10);
        if (!isNaN(questionIndex) && questionIndex >= 0 && questionIndex < data.questions.length) {
          setCurrentQuestion(questionIndex);
        }
      }

      // Load saved answers
      const savedAnswers = sessionStorage.getItem(STORAGE_KEYS.ANSWERS);

      if (savedAnswers) {
        try {
          const parsedAnswers = JSON.parse(savedAnswers) as AnswerType[];
          setAnswers(parsedAnswers);
        } catch (error) {
          console.error("Error parsing saved answers:", error);
          sessionStorage.removeItem(STORAGE_KEYS.ANSWERS);
        }
      }

      setIsInitialized(true);
    }
  }, [data.questions.length, isInitialized]);

  // Save state whenever it changes
  useEffect(() => {
    // Only save after initial load
    if (isInitialized) {
      sessionStorage.setItem(STORAGE_KEYS.DARK_MODE, darkMode.toString());
      sessionStorage.setItem(STORAGE_KEYS.CURRENT_QUESTION, currentQuestion.toString());
      sessionStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
      sessionStorage.setItem(STORAGE_KEYS.CURRENT_SUBJECT, JSON.stringify(subjectInfo.subjectIndex));

    }
  }, [darkMode, currentQuestion, answers, subjectInfo, isInitialized]);
  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Calculate progress percentage

  // Handle answer selection
  const handleAnswerSelect = ({
    status,
    textAnswer,
    optionId,
    subject_tag,
    questionId,
    subject_id
  }: {
    status: string;
    textAnswer?: number;
    optionId?: number;
    subject_tag?: string;
    questionId: number; // ✅ added
    subject_id?: number;
  }) => {
    // **** FLAGGED DATA NOT SAVING PROPERLY
    // console.log(status, textAnswer, optionId, subject_tag, questionId, subject_id,textAnswer);

    const existingAnswerIndex = answers.findIndex(
      (ans) => ans.questionId === questionId && ans.subject_id === subjectInfo.subjectIndex
    );

    const answerPayload: AnswerType = {
      questionId,
      status,
      ...(subject_tag !== undefined && { subject_tag }),
      ...(subject_id !== undefined && { subject_id }),
      ...(optionId !== undefined && { selectedOptionId: optionId }),
      ...(textAnswer !== undefined && { textAnswer }),
    };

    const updatedAnswers = [...answers];

    const currentQuestionId = groupedData[subjectInfo.subjectIndex].questions[subjectInfo.questionIndex1].id

    // if (existingAnswerIndex > -1) {
    //   updatedAnswers[existingAnswerIndex] = answerPayload;
    // } else {
    //   updatedAnswers.push(answerPayload);
    // }

    // setAnswers(updatedAnswers);


    if (existingAnswerIndex > -1) {
      updatedAnswers[existingAnswerIndex] = answerPayload;
      setAnswers(updatedAnswers);
    } else {
      // Only push answerPayload if status is "answered"
      if (status === "flagged") {
        setAnswers([...answers, { questionId: currentQuestionId, status, subject_id, subject_tag }]);
      } else {
        setAnswers([...answers, answerPayload]);
      }
    }

  };

  // Get question status
  const getQuestionStatus = (index: number, subjectInfo: { subjectIndex: number; questionIndex1: number }) => {

    const questionId = groupedData[subjectInfo.subjectIndex].questions[index].id

    if (!questionId) return "unanswered";

    let isAnswered = false;
    let isFlagged = false;

    for (const ans of answers) {
      if (ans.questionId === questionId && ans.subject_id === subjectInfo.subjectIndex) {
        isAnswered = ans.status === "answered";
        isFlagged = ans.status === "flagged";
        break; // remove if multiple entries per questionId possible
      }
    }

    if (isAnswered) {
      return "answered";
    } else if (isFlagged) {
      return "flagged";
    } else {
      return "unanswered";
    }
  };

  const enterFullscreen = () => {
    const el = containerRef.current;
    if (el && !document.fullscreenElement) {
      el.requestFullscreen().catch((err) => {
        console.error("Failed to enter fullscreen:", err);
      });
    }
  };

  // ✅ Setup listeners
  useEffect(() => {

    if (submit === false) {

      enterFullscreen();
    }

    const onFullscreenChange = () => {
      const isInFullscreen = !!document.fullscreenElement;
      if (submit === false) {

        if (!isInFullscreen && isSubmitted === false) {
          alert("You must stay in fullscreen mode during the exam.");
          setShowReEnterButton(true);
        }
      }
    }

    const onFullscreenError = (e: Event) => {
      console.error("Fullscreen error occurred", e);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("fullscreenerror", onFullscreenError);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("fullscreenerror", onFullscreenError);
    };
  }, [isSubmitted]);

  console.log(drawerOpen)

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col"
    >
      {/* Header (fixed height) */}
      <header className="flex justify-between items-center border-b border-gray-300 px-5 py-1 bg-white shadow-sm flex-none">
        <div className="text-lg font-semibold text-blue-800">{data.paper_title}</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 bg-gray-100 rounded border border-gray-300">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-sm text-gray-900">
              <Timer data={data.Timer} flag={flag} />
            </span>
          </div>
          {showReEnterButton && (
            <Button
              onClick={() => {
                enterFullscreen();
                setShowReEnterButton(false);
              }}
              className="bg-white text-blue-700 border border-gray-400 hover:bg-blue-600 hover:text-white px-4 py-2"
            >
              Re-enter Fullscreen
            </Button>
          )}
          <Link href="/result">
            <Button
              onClick={() => setSubmit(true)}
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2"
            >
              Submit
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 border border-gray-400"
          >
            {darkMode ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-blue-400" />}
          </Button>
        </div>
      </header>

      {/* Main content (fills remaining height) */}
      <div className={`flex-1 grid overflow-hidden max-w-screen-2xl mx-auto w-full ${drawerOpen ? "grid-cols-1" : "grid-cols-1"}`}>
        <div
          className={`
          transition-all duration-300 px-2 overflow-y-auto
          w-full
          ${drawerOpen ? "md:pr-[360px]" : "pr-10"}
        `}
        >

          <QuestionPanel
            questions={data.questions}
            currentQuestion={currentQuestion}
            answers={answers.reduce((acc, curr) => {
              if (curr.selectedOptionId !== undefined) {
                acc[curr.questionId] = curr.selectedOptionId;
              } else if (curr.textAnswer !== undefined) {
                acc[curr.questionId] = curr.textAnswer;
              }
              return acc;
            }, {} as Record<number, number>)}
            setCurrentQuestion={setCurrentQuestion}
            handleAnswerSelect={handleAnswerSelect}
            setFlag={setFlag}
            getQuestionStatus={getQuestionStatus}
            setIsSubmitted={setIsSubmitted}
            submit={submit}
            setSubmit={setSubmit}
            examData={{
              positive: parseFloat(data.marking_positive),
              negative: parseFloat(data.marking_negative),
              paper_title: data.paper_title
            }}
            setAllData={setAllData}
            setSubjectInfo={setSubjectInfo}
            subjectInfo={subjectInfo}
            groupedData={groupedData}
            finalans={answers}
          />
        </div>
        <Drawer direction="right" open={drawerOpen} onOpenChange={setDrawerOpen} modal={false}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="fixed top-1/2 right-0 z-50 transform -translate-y-1/2 rounded-l-full
                          bg-white hover:bg-blue-100 transition-all shadow-md hover:shadow-lg"
            >
              <Menu className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-[90vw] sm:w-[360px] h-full
    ml-auto border-l bg-white
    data-[state=open]:backdrop-opacity-0 
    data-[state=open]:backdrop-blur-none
    flex flex-col ">
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <DrawerTitle className="text-lg font-semibold">
                Section : {groupedData[subjectInfo.subjectIndex]?.subject_tag}
              </DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="w-5 h-5" />
                </Button>
              </DrawerClose>
            </div>
            <div className="p-4 overflow-y-auto max-h-screen">
              <QuestionNavigator
                data={data}
                currentQuestion={currentQuestion}
                answers={answers.reduce((acc, curr) => {
                  if (curr.selectedOptionId !== undefined) {
                    acc[curr.questionId] = curr.selectedOptionId;
                  }
                  return acc;
                }, {} as Record<number, number>)}
                finalans={answers}
                getQuestionStatus={getQuestionStatus}
                setCurrentQuestion={setCurrentQuestion}
                setShowQuestionGrid={setShowQuestionGrid}
                subjectInfo={subjectInfo}
                setSubjectInfo={setSubjectInfo}
                groupedData={groupedData}
                closeDrawer={() => setDrawerOpen(false)}
              />
            </div>
          </DrawerContent>
        </Drawer>

      </div>
    </div>
  );



}