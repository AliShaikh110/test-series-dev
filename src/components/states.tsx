import { CheckCircle2, Trophy, Users, Zap } from 'lucide-react'
import React from 'react'

const States = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
          Why Students Choose Us
        </h2>
        <p className="text-muted-foreground max-w-[800px] mx-auto">
          Join millions of students who have achieved their career goals with our comprehensive exam preparation
          platform
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
          <div className="bg-primary-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-3xl font-bold mb-2 text-primary">8.5M+</h3>
          <p className="text-muted-foreground">Registered Students</p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
          <div className="bg-secondary-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-secondary" />
          </div>
          <h3 className="text-3xl font-bold mb-2 text-secondary">250M+</h3>
          <p className="text-muted-foreground">Tests Attempted</p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
          <div className="bg-accent-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-3xl font-bold mb-2 text-accent">4.5M+</h3>
          <p className="text-muted-foreground">Student Selections</p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all">
          <div className="bg-info-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-info" />
          </div>
          <h3 className="text-3xl font-bold mb-2 text-info">5.5M+</h3>
          <p className="text-muted-foreground">Classes Attended</p>
        </div>
      </div>
    </div>
  </section>  )
}

export default States