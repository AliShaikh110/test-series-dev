import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { Award,  BookOpen, CheckCircle2, Clock, TrendingUp, Users } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

const FeatureEexams = () => {
  return (
    <section className="py-16 container">
    <div className="bg-gradient-to-r from-secondary-50 via-secondary-100 to-primary-50 rounded-3xl p-8 md:p-12 relative overflow-hidden bg-red-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM3MjA5YjciIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Nmg2di02aC02em02IDZ2Nmg2di02aC02em0tMTIgMGg2djZoLTZ2LTZ6bTEyIDBoNnY2aC02di02eiIvPjxwYXRoIGQ9Ik0xMiAxMmg2djZoLTZ2LTZ6bTYgMGg2djZoLTZ2LTZ6bTEyIDBoNnY2aC02di02em02IDBoNnY2aC02di02em0tMjQgNmg2djZoLTZ2LTZ6bTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnptLTI0IDEyaDZ2NmgtNnYtNnptNiAwaDZ2NmgtNnYtNnptMTIgMGg2djZoLTZ2LTZ6bS0xMiA2aDZ2NmgtNnYtNnptNiAwaDZ2NmgtNnYtNnptMTIgMGg2djZoLTZ2LTZ6bTEyIDBoNnY2aC02di02em0tMjQgNmg2djZoLTZ2LTZ6bTEyIDBoNnY2aC02di02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-70"></div>
      <div className="flex flex-col md:flex-row gap-8 relative">
        <div className="flex-1 space-y-6">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-secondary border-secondary">
            Featured
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-700">Government Exams Selection Kit</h2>
          <p className="text-secondary-900 max-w-[600px]">
            Complete preparation package with mock tests, study materials, and expert guidance.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">2000+ Practice Questions</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2 shadow-sm">
              <Users className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">1:1 Mentorship</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2 shadow-sm">
              <Award className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Expert Faculty</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2 shadow-sm">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Complete Study Material</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2 shadow-sm">
              <TrendingUp className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">Performance Analytics</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2 shadow-sm">
              <Clock className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Time Management Tools</span>
            </div>
          </div>
          <Button className="mt-4 bg-secondary hover:bg-secondary-700">Enroll Now</Button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="relative h-[250px] w-full md:h-[300px]">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Exam preparation kit"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </section>  )
}

export default FeatureEexams