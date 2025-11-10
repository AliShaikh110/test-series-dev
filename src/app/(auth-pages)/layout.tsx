"use client";
import { motion } from "framer-motion";
import {
  BarChart2,
  Book,
  GraduationCap,
  Newspaper,
  Plus,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  const Feature = ({
    icon,
    text,
    delay,
  }: {
    icon: React.ReactNode;
    text: string;
    delay: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className=" flex items-center space-x-1 group cursor-pointer"
    >
      <div className="flex-shrink-0 pr-2 py-2 ">{icon}</div>
      <p className="text-black text-xs md:text-sm  transition-transform duration-300">
        {text}
      </p>
    </motion.div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-dvh w-full">
      <div className="w-full relative lg:w-1/3 pb-6 lg:pb-0 bg-[#fef1eb] z-5 -mb-8 overflow-hidden">
        <div className="relative z-10 p-4 hover:text-orange-600 transition-colors">
          <div className="relative p-4 ml-4 cursor-pointer z-15">
            <Link
              href="/"
              className="group relative z-20 inline-flex items-center gap-2  px-4 py-1 text-sm font-medium border-black border shadow-md transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:translate-y-[1px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transform transition-transform duration-200 group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto px-4 sm:px-6 md:px-8 pt-8 lg:pt-16 relative z-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6 lg:mb-8">
            Your Journey to
            <span className="block mt-2 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Educational Excellence
            </span>
          </h2>

          <div className="space-y-1 sm:space-y-2 md:space-y-4">
            <Feature  
              icon={<GraduationCap className="w-5 h-5 text-orange-500" />}
              text="Explore 25,000+ colleges and 500+ courses across India"
              delay={0.1}
            />
            <Feature
              icon={<Book className="w-5 h-5 text-orange-500" />}
              text="Access 500+ competitive exam resources"
              delay={0.2}
            />
            <Feature
              icon={<TrendingUp className="w-5 h-5 text-orange-500" />}
              text="Streamline your application process to top institutions"
              delay={0.3}
            />
            <Feature
              icon={<Newspaper className="w-5 h-5 text-orange-500" />}
              text="Stay updated with education trends, news, and articles"
              delay={0.4}
            />
            <Feature
              icon={<BarChart2 className="w-5 h-5 text-orange-500" />}
              text="Compare colleges by rankings, fees, and placements"
              delay={0.5}
            />
            <Feature
              icon={<Plus className="w-5 h-5 text-orange-500" />}
              text="And much more!"
              delay={0.6}
            />
          </div>
        </motion.div>

        {/* Decorative background pattern */}
        <div className="absolute -z-10 inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-300 via-transparent to-transparent" />
        </div>
      </div>
      <div className="flex-1 bg-white">{children}</div>
      <Toaster theme="light" richColors position="top-center" />
    </div>
  );
}
