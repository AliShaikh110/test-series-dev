/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Timer } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type Option = {
  option: string;
  id: number;
}

type Question = {
  id: number;
  question_title: string;
  question_detail: string;
  solution: string;
  hint: string;
  correct_option: string;
  options: Option[];
}

interface QuizClientProps {
  questions: Question[];
}

export default function QuizClient({ questions }: QuizClientProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && !showResults) {
      handleSubmit()
    }
  }, [timeLeft, showResults])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    let correctAnswers = 0
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_option) {
        correctAnswers++
      }
    })
    setScore(correctAnswers)
    setShowResults(true)
  }

  const progress = (Object.keys(answers).length / questions.length) * 100

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 px-4 py-2 text-lg font-semibold bg-white rounded-lg shadow-sm dark:bg-gray-800">
            <Timer className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">{questions[currentQuestion].question_title}</CardTitle>
            {questions[currentQuestion].question_detail && (
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {questions[currentQuestion].question_detail}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion]}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${answers[currentQuestion] === option.option
                    ? "border-primary bg-primary/5"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  <RadioGroupItem value={option.option} id={`option-${option.id}`} />
                  <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer">
                    {option.option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </Button>
            {currentQuestion === questions.length - 1 ? (
              <Button onClick={handleSubmit} disabled={Object.keys(answers).length !== questions.length}>
                Submit
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!answers[currentQuestion]}>
                Next
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <AlertDialog open={showResults}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Quiz Results</AlertDialogTitle>
            <AlertDialogDescription>
              You scored {score} out of {questions.length} questions correctly!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => window.location.reload()}>Try Again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

