import type { Metadata } from "next"
import ResultsDashboard from "@/components/result-dashboard/results-dashboard"
import PreventBackNavigation from "@/components/result-dashboard/prevent-back-navigation"

export const metadata: Metadata = {
  title: "Quiz Results & Insights | ExamMaster",
  description: "View your detailed performance analysis and insights",
}

export default function ResultsDashboardTemplate() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <PreventBackNavigation />

      <ResultsDashboard />
    </main>
  )
}

