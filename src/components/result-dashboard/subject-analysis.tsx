"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"
import { Radar } from "react-chartjs-2"

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function SubjectAnalysis() {
  // Mock data for subject performance
  const subjects = [
    { name: "Physics", score: 78, topperAvg: 92 },
    { name: "Chemistry", score: 85, topperAvg: 90 },
    { name: "Mathematics", score: 65, topperAvg: 88 },
  ]

  // Physics topics
  const physicsTopics = [
    { name: "Mechanics", score: 85 },
    { name: "Electromagnetism", score: 70 },
    { name: "Optics", score: 90 },
    { name: "Modern Physics", score: 65 },
    { name: "Thermodynamics", score: 80 },
  ]

  // Chemistry topics
  const chemistryTopics = [
    { name: "Organic Chemistry", score: 90 },
    { name: "Inorganic Chemistry", score: 85 },
    { name: "Physical Chemistry", score: 80 },
    { name: "Coordination Compounds", score: 75 },
    { name: "Equilibrium", score: 95 },
  ]

  // Mathematics topics
  const mathTopics = [
    { name: "Calculus", score: 60 },
    { name: "Algebra", score: 70 },
    { name: "Coordinate Geometry", score: 65 },
    { name: "Vectors", score: 55 },
    { name: "Probability", score: 75 },
  ]

  const radarData = {
    labels: ["Physics", "Chemistry", "Mathematics", "Problem Solving", "Time Management", "Accuracy"],
    datasets: [
      {
        label: "Your Performance",
        data: [78, 85, 65, 72, 68, 76],
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(99, 102, 241, 1)",
      },
      {
        label: "Top Performers",
        data: [92, 90, 88, 85, 80, 95],
        backgroundColor: "rgba(244, 114, 182, 0.2)",
        borderColor: "rgba(244, 114, 182, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(244, 114, 182, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(244, 114, 182, 1)",
      },
    ],
  }

  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-4">Subject Performance</h2>

          <div className="space-y-6">
            {subjects.map((subject, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{subject.name}</span>
                  <span className="text-sm font-medium">{subject.score}%</span>
                </div>
                <Progress value={subject.score} className="h-2" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">Your Score</span>
                  <span className="text-xs text-muted-foreground">Topper Avg: {subject.topperAvg}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Overall Skill Analysis</h3>
            <div className="h-[300px] flex items-center justify-center">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-4">Topic-wise Performance</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-3 text-blue-600">Physics</h3>
              <div className="space-y-3">
                {physicsTopics.map((topic, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">{topic.name}</span>
                      <span className="text-xs font-medium">{topic.score}%</span>
                    </div>
                    <Progress
                      value={topic.score}
                      className="h-1.5"
                      indicatorClassName={topic.score < 70 ? "bg-amber-500" : ""}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3 text-emerald-600">Chemistry</h3>
              <div className="space-y-3">
                {chemistryTopics.map((topic, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">{topic.name}</span>
                      <span className="text-xs font-medium">{topic.score}%</span>
                    </div>
                    <Progress
                      value={topic.score}
                      className="h-1.5"
                      indicatorClassName={topic.score < 70 ? "bg-amber-500" : ""}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3 text-purple-600">Mathematics</h3>
              <div className="space-y-3">
                {mathTopics.map((topic, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">{topic.name}</span>
                      <span className="text-xs font-medium">{topic.score}%</span>
                    </div>
                    <Progress
                      value={topic.score}
                      className="h-1.5"
                      indicatorClassName={topic.score < 70 ? "bg-amber-500" : ""}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Improvement Areas</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>
                  <span className="font-medium">Mathematics:</span> Focus on Calculus and Vectors where your performance
                  is below 60%.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>
                  <span className="font-medium">Physics:</span> Improve your understanding of Modern Physics concepts.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>
                  <span className="font-medium">Chemistry:</span> Your performance is strong, maintain consistency in
                  Coordination Compounds.
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

