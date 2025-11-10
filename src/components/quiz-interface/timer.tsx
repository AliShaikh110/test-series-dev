import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  data: number;
  flag: boolean;
}

const Timer = ({ data,flag }: Props) => { 
  const router = useRouter();
  const timeInSeconds = data * 60;
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);

  const storedExpiryTime = sessionStorage.getItem("testExpiryTime");

  let initialTimeLeft;
  if (storedExpiryTime) {
    const expiryTimestamp = parseInt(storedExpiryTime, 10);
    const currentTime = Math.floor(Date.now() / 1000);
    initialTimeLeft = Math.max(expiryTimestamp - currentTime, 0);
  } else {
    initialTimeLeft = timeInSeconds;
    const newExpiryTimestamp = Math.floor(Date.now() / 1000) + timeInSeconds;

    sessionStorage.setItem("testExpiryTime", newExpiryTimestamp.toString());
    sessionStorage.setItem(
      "testStartTime",
      Math.floor(Date.now() / 1000).toString()
    );
  }

  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

 
  if (timeLeft <= 0 || flag) {
    sessionStorage.clear();
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowTimeUpModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmitTest = () => {
    router.push("/result");
  };

  return (
    <>
      <div>
        <span className="font-mono text-lg font-semibold text-gray-900 dark:text-white">
          {timeLeft > 0 ? formatTime(timeLeft) : "Time's Up!"}
        </span>
      </div>

      {/* Time's Up Modal */}
      <AlertDialog open={showTimeUpModal} onOpenChange={() => {}}>
        <AlertDialogContent className="border border-red-200 dark:border-red-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 dark:text-red-400 text-xl">
              Time's Up!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Your test time has expired. Please submit your test to see your
              results.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleSubmitTest}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium w-full"
            >
              Submit Test
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Timer;
