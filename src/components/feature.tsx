import React from 'react'
import { Card, CardContent } from './ui/card'
import { BookOpen, CheckCircle2, Clock, Download, TrendingUp, Users } from 'lucide-react'

const Feature = () => {
  return (

    <section className="py-16 container">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
        Comprehensive Learning Experience
      </h2>
      <p className="text-muted-foreground max-w-[800px] mx-auto">
        Everything you need to succeed in your exams, all in one place
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden">
        <div className="h-2 bg-primary"></div>
        <CardContent className="pt-6">
          <div className="bg-primary-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Structured Learning Path</h3>
          <p className="text-muted-foreground">
            Follow a carefully designed curriculum that guides you through concepts, practice, and mastery.
          </p>
        </CardContent>
      </Card>
      <Card className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden">
        <div className="h-2 bg-secondary"></div>
        <CardContent className="pt-6">
          <div className="bg-secondary-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
            <TrendingUp className="h-6 w-6 text-secondary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Performance Analytics</h3>
          <p className="text-muted-foreground">
            Track your progress with detailed insights and identify areas for improvement.
          </p>
        </CardContent>
      </Card>
      <Card className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden">
        <div className="h-2 bg-accent"></div>
        <CardContent className="pt-6">
          <div className="bg-accent-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold mb-2">Expert Mentorship</h3>
          <p className="text-muted-foreground">
            Get guidance from experienced mentors who have helped thousands of students succeed.
          </p>
        </CardContent>
      </Card>
      <Card className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden">
        <div className="h-2 bg-info"></div>
        <CardContent className="pt-6">
          <div className="bg-info-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-info" />
          </div>
          <h3 className="text-xl font-bold mb-2">Time Management Tools</h3>
          <p className="text-muted-foreground">
            Learn to optimize your study time and improve your speed and accuracy during exams.
          </p>
        </CardContent>
      </Card>
      <Card className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden">
        <div className="h-2 bg-success"></div>
        <CardContent className="pt-6">
          <div className="bg-success-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-6 w-6 text-success" />
          </div>
          <h3 className="text-xl font-bold mb-2">Mock Tests & Quizzes</h3>
          <p className="text-muted-foreground">
            Practice with thousands of questions and full-length mock tests that simulate the actual exam.
          </p>
        </CardContent>
      </Card>
      <Card className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden">
        <div className="h-2 bg-warning"></div>
        <CardContent className="pt-6">
          <div className="bg-warning-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
            <Download className="h-6 w-6 text-warning" />
          </div>
          <h3 className="text-xl font-bold mb-2">Offline Access</h3>
          <p className="text-muted-foreground">
            Download study materials and tests to continue learning even without an internet connection.
          </p>
        </CardContent>
      </Card>
    </div>
  </section>
)
}

export default Feature