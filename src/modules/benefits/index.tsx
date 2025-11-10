"use client";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import {
  BellIcon,
  BoxIcon,
  DotFilledIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import {
  Award,
  BotMessageSquareIcon,
  ChartColumnIncreasing,
  Cpu,
  Origami,
} from "lucide-react";

export function BentoGridThirdDemo() {
  return (
    <>
      <div className="  py-16 px-4 sm:py-22  flex   flex-col  gap-y-4 mb-6">
        <h3 className=" text-4xl font-bold tracking-tight bg-clip-text text-transparent  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white pb-1  line-clamp-none md:text-4xl lg:text-5xl font-sans  relative z-20   my-4">
          Master any subject and get job opportunity
        </h3>
        <p className="max-w-3xl text-lg font-medium text-gray-500">
          Whether you're a complete beginner or advance ready to get job
          opportunity from multiple MNC and beyond, Only education will help
          yall.
        </p>
      </div>
      <BentoGrid className=" mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </>
  );
}

const SkeletonOne = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex relative rounded-md overflow-hidden flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <Image
        alt="image"
        fill={true}
        src={
          "https://cdn.dribbble.com/userupload/11072106/file/original-01598180cd259954a4ca4d07a072746f.png?resize=1905x1429"
        }
        className="object-cover object-center  rounded-md "
      />
    </motion.div>
  );
};
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: (40 + (i * 15) % 60) + "%"
          }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
    
  );
};
const SkeletonFour = () => {
  const second = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };

  const first = {
    initial: {
      x: 0,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
    },
  };
  const third = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={second}
        className="h-full w-1/3 overflow-hidden rounded-2xl bg-white p-4 dark:bg-black  flex flex-col items-center justify-center"
      >
        <Image
          src="/svgs/level2badge.svg"
          alt="avatar"
          height={130}
          width={130}
          className="rounded-full "
        />
        <p className="text-md font-bold">level 2</p>
      </motion.div>
      <motion.div
        variants={first}
        className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black  flex flex-col items-center justify-center"
      >
        <Image
          src="/svgs/level1badge.svg"
          alt="avatar"
          height={180}
          width={180}
          className="rounded-full "
        />
        <p className="text-lg font-bold">level 1</p>
      </motion.div>
      <motion.div
        variants={third}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black  flex flex-col items-center justify-center"
      >
        <Image
          src="/svgs/level3badge.svg"
          alt="avatar"
          height={100}
          width={100}
          className="rounded-full "
        />
        <p className="text-sm font-bold">level 3</p>
      </motion.div>
    </motion.div>
    
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      height: 0,
    },
    animate: {
      height: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      height: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex items-end flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] space-x-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: (40 + (i * 15) % 60) + "%"
          }}
          className="flex flex-row rounded-md border border-neutral-100 dark:border-white/[0.2] p-1  gap-x-2 items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};
const items = [
  {
    title: "Beautiful User Interface",
    description: (
      <span className="text-sm">
        Experience the best User Interface out there.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <Origami className="h-8 w-8 text-neutral-500" />,
  },
  {
    title: "Automated Next Questions",
    description: (
      <span className="text-sm">
        Let AI handle the difficulty of your next Question based on current
        answer.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1  ",
    icon: <BotMessageSquareIcon className="h-8 w-8 text-neutral-500" />,
  },
  {
    title: "Contextual Suggestions",
    description: (
      <span className="text-sm">
        Get AI-powered suggestions based on your writing context.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",

    icon: <Cpu className="h-8 w-8 text-neutral-500" />,
  },
  {
    title: "Rankings",
    description: (
      <span className="text-sm">Compare yourself with Top Contenders.</span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <Award className="h-8 w-8 text-neutral-500" />,
  },

  {
    title: "Score Summarization",
    description: (
      <span className="text-sm">
        Analyze your scores and get suggestions for imporvementx.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <ChartColumnIncreasing className="h-8 w-8 text-neutral-500" />,
  },
];
