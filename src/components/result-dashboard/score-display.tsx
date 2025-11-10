"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ScoreDisplay() {
  const [score, setScore] = useState(0)
  const finalScore = 685
  const maxScore = 900
  const percentage = Math.round((finalScore / maxScore) * 100)
  const percentile = 96.8

  useEffect(() => {
    // Animate score counting up
    const timer = setTimeout(() => {
      if (score < finalScore) {
        setScore((prev) => Math.min(prev + Math.ceil(finalScore / 20), finalScore))
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [score])

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-background/80 border-muted">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-lg font-medium text-muted-foreground mb-1">Total Score</h2>
          <div className="flex items-baseline justify-center">
            <motion.span
              className="text-5xl font-bold"
              key={score}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {score}
            </motion.span>
            <span className="text-xl text-muted-foreground ml-2">/ {maxScore}</span>
          </div>

          <div className="mt-4">
            <Progress value={percentage} className="h-2" />
            <div className="flex justify-between mt-1 text-sm text-muted-foreground">
              <span>{percentage}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Percentile</h3>
            <p className="text-2xl font-semibold mt-1">{percentile}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Rank</h3>
            <p className="text-2xl font-semibold mt-1">142</p>
          </div>
        </div>

        <div className="mt-6 bg-primary/10 rounded-lg p-4 border border-primary/20">
          <p className="text-sm font-medium text-center">
            <span className="text-primary">Excellent!</span> You're in the top 5% of test takers
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

