// components/QuizProgress.tsx
"use client";


interface QuizProgressProps {
  answeredCount: number;
  totalQuestions: number;
}

export default function QuizProgress({
  answeredCount,
  totalQuestions
}: QuizProgressProps) {

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {answeredCount} of {totalQuestions} answered
        </span>
      </div>
      {/* <Progress value={progressPercentage} className="h-2" /> */}
    </div>
  );
}