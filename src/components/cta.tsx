import React from 'react'
import { Button } from './ui/button'
import { BookOpen, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const Cta = () => {
  return (
    <section className="py-16 container">
      <div className="bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Nmg2di02aC02em02IDZ2Nmg2di02aC02em0tMTIgMGg2djZoLTZ2LTZ6bTEyIDBoNnY2aC02di02eiIvPjxwYXRoIGQ9Ik0xMiAxMmg2djZoLTZ2LTZ6bTYgMGg2djZoLTZ2LTZ6bTEyIDBoNnY2aC02di02em02IDBoNnY2aC02di02em0tMjQgNmg2djZoLTZ2LTZ6bTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnptLTI0IDEyaDZ2NmgtNnYtNnptNiAwaDZ2NmgtNnYtNnptMTIgMGg2djZoLTZ2LTZ6bS0xMiA2aDZ2NmgtNnYtNnptNiAwaDZ2NmgtNnYtNnptMTIgMGg2djZoLTZ2LTZ6bTEyIDBoNnY2aC02di02em0tMjQgNmg2djZoLTZ2LTZ6bTEyIDBoNnY2aC02di02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Success Journey?</h2>
            <p className="text-white/90 max-w-[600px]">
              Join millions of students who have achieved their career goals with our comprehensive exam preparation
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90">
                Start Free Trial <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white bg-white/20 gap-2">
                Explore Plans <BookOpen className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative h-[250px] w-full md:h-[300px]">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Success journey"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>  )
}

export default Cta