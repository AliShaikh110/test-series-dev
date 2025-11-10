"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, TrendingUp, Medal } from "lucide-react"

export default function LeaderboardInsights() {
  // Mock data for top performers
  const topPerformers = [
    { name: "Arjun S.", score: 845, rank: 1, avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Priya M.", score: 832, rank: 2, avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Rahul K.", score: 810, rank: 3, avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Neha G.", score: 795, rank: 4, avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Vikram P.", score: 780, rank: 5, avatar: "/placeholder.svg?height=40&width=40" },
  ]

  // Your data
  const yourData = {
    name: "You",
    score: 685,
    rank: 142,
    percentile: 96.8,
    improvement: "+18",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  return (
    <Card className="backdrop-blur-sm bg-background/80 border-muted">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Leaderboard Insights
          </h2>

          <div className="flex items-center mt-2 md:mt-0">
            <Badge
              variant="outline"
              className="gap-1 text-emerald-500 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30"
            >
              <TrendingUp className="h-3 w-3" />
              {yourData.improvement} positions since last test
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Top Performers</h3>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                      {index === 0 && <Trophy className="h-4 w-4 text-amber-500" />}
                      {index === 1 && <Medal className="h-4 w-4 text-slate-400" />}
                      {index === 2 && <Medal className="h-4 w-4 text-amber-700" />}
                      {index > 2 && performer.rank}
                    </div>

                    <Avatar>
                      <AvatarImage src={performer.avatar} alt={performer.name} />
                      <AvatarFallback>{performer.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">{performer.name}</p>
                      <p className="text-xs text-muted-foreground">Rank #{performer.rank}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{performer.score}</p>
                    <p className="text-xs text-muted-foreground">{Math.round((performer.score / 900) * 100)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Your Standing</h3>

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={yourData.avatar} alt={yourData.name} />
                  <AvatarFallback>{yourData.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium">{yourData.name}</p>
                  <p className="text-xs text-muted-foreground">Rank #{yourData.rank}</p>
                </div>

                <div className="ml-auto text-right">
                  <p className="font-semibold">{yourData.score}</p>
                  <p className="text-xs text-muted-foreground">{Math.round((yourData.score / 900) * 100)}%</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Your Score</span>
                  <span className="font-medium">{yourData.score}/900</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Top 1% Range</span>
                  <span className="font-medium">780-845</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Gap to Top 1%</span>
                  <span className="font-medium">95 points</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Performance Insight</h4>
              <p className="text-sm text-muted-foreground">
                You're performing better than 96.8% of test takers. Focus on improving your Mathematics score to break
                into the top 100 ranks.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

