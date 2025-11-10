// components/QuestionGridModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

interface QuestionGridModalProps {
  showQuestionGrid: boolean;
  setShowQuestionGrid: (show: boolean) => void;
  data: any;
  currentQuestion: number;
  getQuestionStatus: (index: number) => string;
  setCurrentQuestion: (index: number) => void;
}

export default function QuestionGridModal({
  showQuestionGrid,
  setShowQuestionGrid,
  data,
  currentQuestion,
  getQuestionStatus,
  setCurrentQuestion,
}: QuestionGridModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "answered":
        return "bg-green-500/20 border-green-500 text-green-700 dark:text-green-400";
      case "flagged":
        return "bg-amber-500/20 border-amber-500 text-amber-700 dark:text-amber-400";
      default:
        return "bg-gray-200 border-gray-400 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400";
    }
  };

  return (
    <AnimatePresence>
      {showQuestionGrid && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          {/* <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-auto"
          > */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                All Questions
              </h2>
              <Button
                variant="ghost" 
                size="icon"
                onClick={() => setShowQuestionGrid(false)}
              >
                <Cross2Icon className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                {Array.from({ length: data.questions.length }, (_, i) => i).map(
                  (index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentQuestion(index);
                        setShowQuestionGrid(false);
                      }}
                      className={`w-full aspect-square flex items-center justify-center rounded-lg text-sm font-medium border ${
                        currentQuestion === index
                          ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800"
                          : ""
                      } ${getStatusColor(getQuestionStatus(index))}`}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Answered
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Flagged
                  </span>
                </div>
              
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Unanswered
                  </span>
                </div>
              </div>

              <Button onClick={() => setShowQuestionGrid(false)}>
                Close
              </Button>
            </div>
          </motion.div>
        // </motion.div>
      )}
    </AnimatePresence>
  );
}