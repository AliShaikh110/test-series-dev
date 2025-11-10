import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
  BookOpen,
} from "lucide-react"
const HeroSection = () => {
  return (
    <main className="flex-1">
    {/* Hero Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-100 via-primary-50 to-background pt-16 pb-12 md:pb-0">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48cGF0aCBkPSJNMTIgMTJoNnY2aC02di02em02IDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnptNiAwaDZ2NmgtNnYtNnptLTI0IDZoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnptMTIgMGg2djZoLTZ2LTZ6bS0yNCAxMmg2djZoLTZ2LTZ6bTYgMGg2djZoLTZ2LTZ6bTEyIDBoNnY2aC02di02em0tMTIgNmg2djZoLTZ2LTZ6bTYgMGg2djZoLTZ2LTZ6bTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnptLTI0IDZoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
      <div className="container flex flex-col md:flex-row items-center">
        <div className="flex-1 space-y-6 pb-8 relative z-10">
          <Badge className="px-3 py-1 text-sm bg-accent text-white">#1 Exam Preparation Platform</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Your Path to{" "}
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              Success
            </span>{" "}
            Starts Here
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Comprehensive test series, expert guidance, and personalized learning paths to ace your exams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              Start Free Trial <ChevronRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-primary text-primary hover:bg-primary-50">
              Explore Courses <BookOpen className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-8 pt-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">5M+</span>
              <span className="text-sm text-muted-foreground">Students</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-secondary">1000+</span>
              <span className="text-sm text-muted-foreground">Test Series</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-accent">95%</span>
              <span className="text-sm text-muted-foreground">Success Rate</span>
            </div>
          </div>
        </div>
        <div className="flex-1 relative md:h-[500px]">
          <div className="relative h-[300px] md:h-[500px] w-full">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Students studying"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
      <div className="absolute -bottom-12 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background"></div>
    </section>

  </main>  )
}

export default HeroSection