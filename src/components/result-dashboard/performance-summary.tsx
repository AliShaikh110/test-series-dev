"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, HelpCircle, Clock } from "lucide-react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js"
import { Doughnut, Bar } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function PerformanceSummary() {
  // Mock data
  const correct = 57
  const incorrect = 18
  const unattempted = 15
  const total = correct + incorrect + unattempted

  const doughnutData = {
    labels: ["Correct", "Incorrect", "Unattempted"],
    datasets: [
      {
        data: [correct, incorrect, unattempted],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)", // Green for correct
          "rgba(239, 68, 68, 0.8)", // Red for incorrect
          "rgba(148, 163, 184, 0.8)", // Gray for unattempted
        ],
        borderColor: ["rgba(16, 185, 129, 1)", "rgba(239, 68, 68, 1)", "rgba(148, 163, 184, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const timeData = {
    labels: ["Physics", "Chemistry", "Mathematics"],
    datasets: [
      {
        label: "Avg. Time per Question (sec)",
        data: [68, 52, 75],
        backgroundColor: "rgba(99, 102, 241, 0.6)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
      },
      {
        label: "Top Performers Avg. (sec)",
        data: [45, 40, 60],
        backgroundColor: "rgba(244, 114, 182, 0.6)",
        borderColor: "rgba(244, 114, 182, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  }

  return (
    <Card className="backdrop-blur-sm bg-background/80 border-muted h-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Question Summary</h2>
            <div className="flex items-center justify-center h-[220px]">
              <Doughnut data={doughnutData} options={options} />
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-emerald-500">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">Correct</span>
                </div>
                <p className="text-lg font-semibold">{correct}</p>
                <p className="text-xs text-muted-foreground">({Math.round((correct / total) * 100)}%)</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-red-500">
                  <XCircle className="h-4 w-4" />
                  <span className="font-medium">Incorrect</span>
                </div>
                <p className="text-lg font-semibold">{incorrect}</p>
                <p className="text-xs text-muted-foreground">({Math.round((incorrect / total) * 100)}%)</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-slate-400">
                  <HelpCircle className="h-4 w-4" />
                  <span className="font-medium">Skipped</span>
                </div>
                <p className="text-lg font-semibold">{unattempted}</p>
                <p className="text-xs text-muted-foreground">({Math.round((unattempted / total) * 100)}%)</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4">Time Analysis</h2>
            <div className="h-[220px] flex items-center">
              <Bar data={timeData} options={options} />
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">
                  <span className="font-medium">Time Management:</span> You spent 20% more time on Mathematics questions
                  compared to top performers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

