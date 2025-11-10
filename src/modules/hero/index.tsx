import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className=" h-[100dvh] grid grid-cols-2">
        <div className="flex h-full items-start justify-center w-full flex-col">
          <h2 className="bg-clip-text text-transparent text-start bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            Master Your Exams, <br /> With Only Testz.
          </h2>
          <p className=" text-sm md:text-lg text-neutral-700 dark:text-neutral-400 ">
            Elevate your test preparation with our gamified mock tests. Climb
            the ranks from Bronze to Diamond!
          </p>
          <div className="w-full justify-start flex mt-6 ">
            <Button className="text-xl p-6 bg-gradient-to-r from-orange-400 to-orange-600">
              Get Started
            </Button>
          </div>
        </div>
        <div className="flex h-full items-end justify-center w-full flex-col">
          <Image
            priority
            src="/svgs/hero.svg"
            height={502}
            width={502}
            alt="Follow us on Twitter"
          />
        </div>
      </div>
    </div>
  );
}
