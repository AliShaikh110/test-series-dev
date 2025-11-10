/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Adjust the path based on your project structure
import { useState } from "react";
// Removed incorrect Input import from "postcss"

interface InstructionsProps {
  data:
  {
    id: string;
    paper_title: string;
    questions: [{}]
  };
}

const Instructions = ({ data }: InstructionsProps) => {

  const [check, setCheck] = useState(false)

  return (
    <div className="relative min-h-screen mx-auto p-6 space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          {data.paper_title}
        </h1>
        <h2 className="text-xl font-semibold mb-3">General Instructions</h2>

        <ol className="list-decimal space-y-4 pl-5 text-gray-700 dark:text-gray-300">
          <li>
            The clock will be set at the server. The countdown timer at the top right corner of the screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You need not terminate the examination or submit your paper.
          </li>
          <li>
            The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:
            <ul className="list-disc pl-5 mt-2">
              <li>You have not visited the question yet.</li>
              <li>You have not answered the question.</li>
              <li>You have answered the question.</li>
              <li>You have NOT answered the question, but have marked the question for review.</li>
              <li>You have answered the question also marked it for review.</li>
            </ul>
            <p className="mt-2">
              The Mark For Review status for a question simply indicates that you would like to look at that question again. If a question is answered but marked for review, then the answer will be considered for evaluation unless the status is modified by the candidate.
            </p>
          </li>
          <li>
            <strong>Navigating to a Question:</strong>
            <ul className="list-disc pl-5 mt-2">
              <li>
                Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.
              </li>
              <li>
                Click on Next to save your answer for the current question and then go to the next question.
              </li>
              <li>
                Note that your answer for the current question will not be saved if you navigate to another question directly by clicking on a question number without saving the answer to the previous question.
              </li>
              <li>
                You can view all the questions by clicking on the Question Paper button.
              </li>
            </ul>
          </li>
          <li>
            <strong>Answering a Question:</strong>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <strong>MCQ:</strong> {`Choose one answer, click the option to select. Click again to deselect. Click another to change. Click "Next" to save.`}
              </li>
              <li>
                <strong>Numerical:</strong> {`Use the keypad. Can input decimals, e.g., 12.5435. Click "Next" to save.`}
              </li>
            </ul>
          </li>
          <li>
            To mark a question for review, click the Star button in the top right corner of the screen. If an answer is selected or entered and the question is marked for review, it will still be considered in the evaluation.
          </li>
          <li>
            To change your answer, select the question and follow the same procedure to answer.
          </li>
          <li>
            Only questions with answers that are saved or marked for review will be considered for evaluation.
          </li>
          <li>
            Sections in the paper are displayed at the top bar of the screen. Navigate through them using the section buttons.
          </li>
          <li>
            {`After clicking Next on the last question of a section, you'll automatically move to the next section.`}
          </li>
        </ol>

      </Card>


      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 px-6 z-50 shadow-md">
        <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          <label htmlFor="agree" className="flex items-start gap-2">
            <input type="checkbox" id="agree" className="mt-1" onChange={() => setCheck(!check)} />
            <span>
              I have read all the instructions carefully and have understood them. I agree not to chat or use unfair means in examinations. I understood that using unfair means of any sort for my own or someone else’s advantage will lead to my immediate disqualification. The decision of Collegedunia.com will be final in these matters & cannot be appealed.
            </span>
          </label>
        </div>
        <div className="flex justify-center gap-3 items-center mt-2">
          <Link href="/practice">
            <Button variant="outline" className="px-6 py-3 text-sm">Go Back</Button>
          </Link>
          {check ? (
            <Link href={`/test/${data.id}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm">Start the test</Button>
            </Link>
          ) : (
            <Button className="bg-gray-400 text-white px-6 py-3 text-sm" disabled>Start the test</Button>
          )}
        </div>
      </div>

      <div className="h-24" />

    </div>
  );
};

export default Instructions;
