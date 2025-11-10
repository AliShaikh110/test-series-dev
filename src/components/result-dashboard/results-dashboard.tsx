"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Share2, Download, Award, TrendingUp, Clock, BookOpen, BrainCircuit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import ScoreDisplay from "@/components/result-dashboard/score-display"
import PerformanceSummary from "@/components/result-dashboard/performance-summary"
import LeaderboardInsights from "@/components/result-dashboard/leaderboard-insights"
import SubjectAnalysis from "@/components/result-dashboard/subject-analysis"
import QuestionBreakdown from "@/components/result-dashboard/question-breakdown"
import ProgressTracking from "@/components/result-dashboard/progress-tracking"
import StudySuggestions from "@/components/result-dashboard/study-suggestions"
import ShareableCard from "@/components/result-dashboard/shareable-card"
import Confetti from "@/components/result-dashboard/confetti"
import Link from "next/link"

export default function ResultsDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Show confetti animation on initial load
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 5000)

    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`w-full px-4 py-6 md:px-8 lg:px-12 ${isDarkMode ? "dark" : ""}`}>
      {showConfetti && <Confetti />}

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Test Results</h1>
          <p className="text-muted-foreground mt-1">JEE Advanced Mock Test #4 • Completed on June 12, 2024</p>
        </div>
        <Link href="/">
        <Button>
          Back to home
        </Button>
        </Link>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>

          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>

          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <ScoreDisplay />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <PerformanceSummary />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <LeaderboardInsights />
      </motion.div>

      <Tabs defaultValue="analysis" className="mb-8">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="analysis" className="gap-2">
            <BrainCircuit className="h-4 w-4" />
            <span className="hidden sm:inline">Detailed Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="subjects" className="gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Subject Performance</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Progress Tracking</span>
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="gap-2">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Study Suggestions</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis">
          <QuestionBreakdown />
        </TabsContent>

        <TabsContent value="subjects">
          <SubjectAnalysis />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTracking />
        </TabsContent>

        <TabsContent value="suggestions">
          <StudySuggestions />
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto py-4 px-6 flex flex-col items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Retake Test</span>
              </Button>
              <Button className="h-auto py-4 px-6 flex flex-col items-center gap-2" variant="secondary">
                <BookOpen className="h-5 w-5" />
                <span>Practice Weak Areas</span>
              </Button>
              <Button className="h-auto py-4 px-6 flex flex-col items-center gap-2" variant="outline">
                <Award className="h-5 w-5" />
                <span>Leaderboard Challenge</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ShareableCard />
    </div>
  )
}

