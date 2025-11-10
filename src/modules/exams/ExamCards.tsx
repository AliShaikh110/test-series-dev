import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Users } from "lucide-react";

interface Exam {
  title: string;
  totalTests: number;
  freeTests: number;
  users: string;
  languages: string[];
  details: string[];
}

const ExamCard = ({ examDetails }: { examDetails: Exam }) => {
  return (
    <Card className="w-64 max-h-[26rem] flex flex-col shadow-none border">
      
    </Card>
  );
};

export default ExamCard;
