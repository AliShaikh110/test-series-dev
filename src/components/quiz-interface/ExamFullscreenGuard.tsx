"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExamFullscreenGuard() {
  const router = useRouter();

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen =
        document.fullscreenElement ||
        // For Safari
        (document as any).webkitFullscreenElement;

      if (!isFullscreen) {
        // User exited fullscreen — take action
        alert("You must stay in fullscreen mode to continue the exam.");
        // Re-enter fullscreen (optional)
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if ((elem as any).webkitRequestFullscreen) {
            (elem as any).webkitRequestFullscreen(); // Safari
          }

        // OR redirect them out of the exam
        // router.push("/");
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, [router]);

  return null;
}
