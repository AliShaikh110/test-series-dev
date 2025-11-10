"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { TrendingUp, Award, Target } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function ProgressTracking() {
  // Mock data for progress over time
  const testDates = ["Jan 15", "Feb 2", "Feb 20", "Mar 10", "Mar 28", "Apr 15", "May 3", "May 22", "Jun 12"]

  const progressData = {
    labels: testDates,
    datasets: [
      {
        label: "Your Score",
        data: [450, 480, 510, 545, 580, 610, 635, 660, 685],
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Average Score",
        data: [420, 435, 455, 470, 490, 510, 530, 550, 570],
        borderColor: "rgba(148, 163, 184, 1)",
        backgroundColor: "rgba(148, 163, 184, 0.1)",
        borderDash: [5, 5],
        tension: 0.3,
        fill: false,
      },
      {
        label: "Top 5% Score",
        data: [650, 670, 685, 700, 715, 730, 745, 760, 780],
        borderColor: "rgba(244, 114, 182, 1)",
        backgroundColor: "rgba(244, 114, 182, 0.1)",
        borderDash: [3, 3],
        tension: 0.3,
        fill: false,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        min: 400,
        max: 900,
      },
    },
  }

  // Mock achievements
  const achievements = [
    {
      name: "Fast Learner",
      description: "Improved score by 20% in 3 months",
      icon: <TrendingUp className="h-4 w-4" />,
      date: "May 22",
    },
    {
      name: "Chemistry Expert",
      description: "Scored 90%+ in Chemistry 3 times in a row",
      icon: <Award className="h-4 w-4" />,
      date: "Apr 15",
    },
    {
      name: "Consistent Performer",
      description: "Maintained top 10% rank for 5 consecutive tests",
      icon: <Target className="h-4 w-4" />,
      date: "Mar 28",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-4">Performance Over Time</h2>
          <div className="h-[350px]">
            <Line data={progressData} options={options} />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <h3 className="text-sm font-medium">Improvement Rate</h3>
              </div>
              <p className="text-2xl font-semibold">+52%</p>
              <p className="text-xs text-muted-foreground">Since your first test</p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-4 w-4 text-amber-500" />
                <h3 className="text-sm font-medium">Consistency Score</h3>
              </div>
              <p className="text-2xl font-semibold">8.5/10</p>
              <p className="text-xs text-muted-foreground">Based on last 9 tests</p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-blue-500" />
                <h3 className="text-sm font-medium">Target Gap</h3>
              </div>
              <p className="text-2xl font-semibold">95 points</p>
              <p className="text-xs text-muted-foreground">To reach top 1% (780+)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-4">Achievements & Badges</h2>

          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    {achievement.icon}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{achievement.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        New
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">Earned on {achievement.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-muted/50 text-center">
            <h3 className="text-sm font-medium mb-2">Next Achievement</h3>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted mx-auto mb-2">
              <Award className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">Mathematics Master</p>
            <p className="text-xs text-muted-foreground mt-1">Score 80%+ in Mathematics 3 times in a row</p>
            <p className="text-xs font-medium text-primary mt-2">1/3 completed</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

