"use client";
import { useEffect, useRef, useState } from "react";
import { HeaderContent } from "./HeaderContent";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [elevated, setElevated] = useState(false); // add shadow after some scroll
  const lastY = useRef(0);
  const ticking = useRef(false);
  const THRESHOLD = 8; // px to avoid jitter

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // add shadow/elevation after small scroll
          setElevated(y > 2);

          // always show at very top
          if (y <= 0) {
            setVisible(true);
            lastY.current = 0;
            ticking.current = false;
            return;
          }

          const diff = y - lastY.current;

          if (Math.abs(diff) > THRESHOLD) {
            if (diff > 0) {
              // scrolling down
              setVisible(false);
            } else {
              // scrolling up
              setVisible(true);
            }
            lastY.current = y;
          }

          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    // initialize
    lastY.current = typeof window !== "undefined" ? window.scrollY : 0;

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-18 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${elevated ? "shadow-sm" : "shadow-none"} 
        bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-neutral-900/70`}
    >
      <HeaderContent />
    </header>
  );
}
