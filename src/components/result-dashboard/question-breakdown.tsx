"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import { ChevronRightIcon } from "@radix-ui/react-icons"

export default function QuestionBreakdown() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  // Mock data for questions
  const questions = [
    { id: 1, subject: "Physics", topic: "Mechanics", difficulty: "easy", status: "correct", time: 45, avgTime: 60 },
    {
      id: 2,
      subject: "Chemistry",
      topic: "Organic Chemistry",
      difficulty: "medium",
      status: "correct",
      time: 65,
      avgTime: 75,
    },
    {
      id: 3,
      subject: "Mathematics",
      topic: "Calculus",
      difficulty: "hard",
      status: "incorrect",
      time: 120,
      avgTime: 90,
    },
    {
      id: 4,
      subject: "Physics",
      topic: "Electromagnetism",
      difficulty: "medium",
      status: "correct",
      time: 70,
      avgTime: 80,
    },
    {
      id: 5,
      subject: "Chemistry",
      topic: "Physical Chemistry",
      difficulty: "easy",
      status: "correct",
      time: 50,
      avgTime: 55,
    },
    {
      id: 6,
      subject: "Mathematics",
      topic: "Algebra",
      difficulty: "hard",
      status: "incorrect",
      time: 110,
      avgTime: 95,
    },
    {
      id: 7,
      subject: "Physics",
      topic: "Modern Physics",
      difficulty: "medium",
      status: "incorrect",
      time: 85,
      avgTime: 75,
    },
    {
      id: 8,
      subject: "Chemistry",
      topic: "Inorganic Chemistry",
      difficulty: "easy",
      status: "correct",
      time: 40,
      avgTime: 60,
    },
  ]

  const filteredQuestions =
    selectedDifficulty === "all" ? questions : questions.filter((q) => q.difficulty === selectedDifficulty)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200"
      case "medium":
        return "text-amber-500 bg-amber-50 dark:bg-amber-950/30 border-amber-200"
      case "hard":
        return "text-red-500 bg-red-50 dark:bg-red-950/30 border-red-200"
      default:
        return ""
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "correct":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "incorrect":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "unattempted":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-lg font-medium">Question-wise Analysis</h2>

          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <span className="text-sm text-muted-foreground">Filter by difficulty:</span>
            <div className="flex">
              <Button
                variant={selectedDifficulty === "all" ? "default" : "outline"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setSelectedDifficulty("all")}
              >
                All
              </Button>
              <Button
                variant={selectedDifficulty === "easy" ? "default" : "outline"}
                size="sm"
                className="rounded-none border-l-0"
                onClick={() => setSelectedDifficulty("easy")}
              >
                Easy
              </Button>
              <Button
                variant={selectedDifficulty === "medium" ? "default" : "outline"}
                size="sm"
                className="rounded-none border-l-0"
                onClick={() => setSelectedDifficulty("medium")}
              >
                Medium
              </Button>
              <Button
                variant={selectedDifficulty === "hard" ? "default" : "outline"}
                size="sm"
                className="rounded-l-none border-l-0"
                onClick={() => setSelectedDifficulty("hard")}
              >
                Hard
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="physics">
          <TabsList className="mb-4">
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
          </TabsList>

          {["physics", "chemistry", "mathematics"].map((subject) => (
            <TabsContent key={subject} value={subject}>
              <div className="space-y-3">
                {filteredQuestions
                  .filter((q) => q.subject.toLowerCase() === subject)
                  .map((question) => (
                    <div
                      key={question.id}
                      className="flex items-center p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background border">
                        {question.id}
                      </div>

                      <div className="ml-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{question.topic}</span>
                          <Badge variant="outline" className={`${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{question.time}s</span>
                          </div>
                          <div>Avg: {question.avgTime}s</div>
                          {question.time > question.avgTime ? (
                            <span className="text-amber-500">+{question.time - question.avgTime}s slower</span>
                          ) : (
                            <span className="text-emerald-500">-{question.avgTime - question.time}s faster</span>
                          )}
                        </div>
                      </div>

                      <div className="ml-auto flex items-center gap-3">
                        {getStatusIcon(question.status)}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                {filteredQuestions.filter((q) => q.subject.toLowerCase() === subject).length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">No questions match the selected filter.</div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

