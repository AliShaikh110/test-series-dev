"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { cubicBezier } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/ThemeSwitch";
import { UserProfileButton } from "@/components/UserProfileButton";
import { useAuth } from "@/hooks/auth-hook";
import { getUserPicture } from "@/data/services/get-user-loader";

// Define types for navItems and props
type NavItem = {
  name: string;
  link: string;
};

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export const FloatingNav = ({}) => {
  const { isAuthenticated, user } = useAuth();

  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const inOutExpo = cubicBezier(0.87, 0, 0.13, 1);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let scrollValue = Math.floor(current * 100) / 2;
      const previous = scrollYProgress.getPrevious();

      // Ensure previous is defined and a number
      if (typeof previous === "number") {
        let direction = current - previous;

        scrollValue > 4 && setVisible(false); // hide nav on certain amount of scroll
        direction < 0 && setVisible(true);
      }
    }
  });

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          style={{ borderWidth: "0.1px" }}
          initial={{
            opacity: 1,
            y: -120,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.7,
            ease: inOutExpo,
          }}
          className={cn(
            "flex fixed top-0 inset-x-0 rounded-b-3xl bg-[#fff] dark:bg-transparent dark:backdrop-blur-md shadow-sm z-[5000] pl-8 py-5 border border-borderLight dark:border-border items-center justify-between space-x-4 pr-5"
          )}
        >
          <div>
            <Link href={"/"}>
              <div className="justify-center items-center flex gap-x-3">
                <svg
                  width="40"
                  height="50"
                  viewBox="0 0 300 400"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2.5"
                    y="2.5"
                    width="95"
                    height="95"
                    fill="black"
                    stroke="black"
                    strokeWidth="5"
                  />
                  <rect
                    x="2.5"
                    y="102.5"
                    width="95"
                    height="95"
                    fill="black"
                    stroke="black"
                    strokeWidth="5"
                  />
                  <rect
                    x="102.5"
                    y="202.5"
                    width="95"
                    height="95"
                    fill="black"
                    stroke="black"
                    strokeWidth="5"
                  />
                  <rect y="297" width="100" height="100" fill="black" />
                  <rect
                    x="102.5"
                    y="2.5"
                    width="95"
                    height="95"
                    fill="black"
                    stroke="black"
                    strokeWidth="5"
                  />
                  <rect
                    x="202.5"
                    y="102.5"
                    width="95"
                    height="95"
                    fill="black"
                    stroke="black"
                    strokeWidth="5"
                  />
                  <rect
                    x="202.5"
                    y="202.5"
                    width="95"
                    height="95"
                    fill="black"
                    stroke="black"
                    strokeWidth="5"
                  />
                </svg>
                <h4 className="font-semibold text-light">Only edu</h4>
              </div>
            </Link>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-x-8 hidden sm:flex "></div>
          <div className="sm:hidden block z-[99] absolute right-5 top-5 "></div>
          <div className="gap-x-2 hidden sm:flex justify-center items-center items-cente z-10 ">
            {isAuthenticated ? (
              <UserProfileButton
                firstName={user?.fullname}
                email={user?.email}
                pictureURL={null}
              />
            ) : (
              <>
                <Link href={"/sign-up"}>
                  <Button variant="outline" className=" ">
                    Login
                  </Button>
                </Link>
                <Link href={"/sign-in"}>
                  <Button className="bg-gradient-to-r from-orange-400 to-orange-600">
                    Signup
                  </Button>
                </Link>
              </>
            )}
            <div className="">
              <ThemeSwitch />
            </div>
          </div>
          <div className="z-[98] sm:hidden block"></div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
