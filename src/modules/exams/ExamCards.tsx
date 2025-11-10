import React from "react";
import {
  Card,
} from "@/components/ui/card";

interface Exam {
  title: string;
  totalTests: number;
  freeTests: number;
  users: string;
  languages: string[];
  details: string[];
}

const ExamCard = ({ examDetails }: { examDetails: Exam }) => {
  console.log('examDetails', examDetails);
  return (
    <Card className="w-64 max-h-[26rem] flex flex-col shadow-none border">

    </Card>
  );
};

export default ExamCard;
