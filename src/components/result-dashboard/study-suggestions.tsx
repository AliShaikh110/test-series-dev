"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, BrainCircuit, Lightbulb } from "lucide-react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

export default function StudySuggestions() {
  // Mock data for study suggestions
  const weakAreas = [
    {
      subject: "Mathematics",
      topics: ["Calculus", "Vectors"],
      resources: [
        { type: "Video", title: "Calculus Fundamentals", duration: "45 min" },
        { type: "Practice", title: "Vector Problems Set", questions: 25 },
      ],
    },
    {
      subject: "Physics",
      topics: ["Modern Physics", "Electromagnetism"],
      resources: [
        { type: "Video", title: "Quantum Physics Explained", duration: "60 min" },
        { type: "Practice", title: "Electromagnetic Field Problems", questions: 20 },
      ],
    },
  ]

  const timeManagement = [
    { tip: "Spend no more than 2 minutes on easy questions", relevance: "You spent avg. 3.5 min on easy questions" },
    { tip: "Skip difficult questions and return later", relevance: "You attempted all questions sequentially" },
    { tip: "Practice with timed mock tests", relevance: "Your time management score is 68/100" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">Personalized Study Plan</h2>
          </div>

          <div className="space-y-6">
            {weakAreas.map((area, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/40 border border-muted">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{area.subject}</h3>
                  <Badge variant="outline">Focus Area</Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {area.topics.map((topic, i) => (
                    <Badge key={i} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-3 mt-4">
                  <h4 className="text-sm font-medium">Recommended Resources</h4>

                  {area.resources.map((resource, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-background">
                      <div className="flex items-center gap-2">
                        {resource.type === "Video" ? (
                          <BookOpen className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Lightbulb className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="text-sm">{resource.title}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {resource.type === "Video" ? (
                          <span className="text-xs text-muted-foreground">{resource.duration}</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">{resource.questions} questions</span>
                        )}
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ArrowRightIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Complete Study Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium">Time Management Tips</h2>
            </div>

            <div className="space-y-4">
              {timeManagement.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary mt-0.5">
                    {index + 1}
                  </div>

                  <div>
                    <p className="font-medium text-sm">{tip.tip}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tip.relevance}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/40">
              <h3 className="text-sm font-medium mb-2">Practice Recommendation</h3>
              <p className="text-xs text-muted-foreground">
                Complete 3 timed mock tests this week focusing on quick decision making for difficult questions.
              </p>
              <Button variant="link" size="sm" className="px-0 mt-2">
                View Recommended Tests
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium">Expert Insights</h2>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 mb-4">
              <p className="text-sm italic">
                {`"Your performance shows strong conceptual understanding but needs improvement in application. Focus on
                solving more complex problems in Mathematics."`}
              </p>
              <p className="text-xs text-muted-foreground mt-2">— Dr. Sharma, JEE Expert</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Key Takeaways</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Strengthen problem-solving speed in Mathematics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Review Modern Physics concepts thoroughly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Maintain your strong performance in Chemistry</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

