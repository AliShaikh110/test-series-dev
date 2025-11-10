"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Download } from "lucide-react"
import { Trophy, Award, Star } from "lucide-react"
import { CopyIcon } from "@radix-ui/react-icons"

export default function ShareableCard() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    // In a real app, this would copy a shareable link
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">Share Your Achievement</h2>
              <p className="text-sm text-muted-foreground mt-1">Let your friends know about your progress</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleCopy}>
                {copied ? <span className="text-xs font-medium">Copied!</span> : <CopyIcon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-background/80 backdrop-blur-sm rounded-lg border">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">JEE Advanced Mock Test #4</h3>
                  <Badge variant="outline" className="text-xs">
                    Top 5%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">I scored 685/900 (76%) and ranked #142</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Award className="h-3 w-3" />
                <span>ExamMaster</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

