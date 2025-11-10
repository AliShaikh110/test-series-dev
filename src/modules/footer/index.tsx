import React from "react";
import { Linkedin, Twitter, Dribbble, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" py-12 px-4 md:px-8">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Left column */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white">
              Helping students follow their dream.
            </h2>
            <div className="flex space-x-4">
              <SocialIcon Icon={Linkedin} />
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Dribbble} />
              <SocialIcon Icon={Instagram} />
            </div>
          </div>

          {/* Middle column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick links</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "WHO WE ARE",
                "OUR PROCESS",
                "PROJECTS",
                "SERVICES",
                "PRICING",
                "BLOG",
                "TESTIMONIALS",
              ].map((link) => (
                <QuickLink key={link} text={link} />
              ))}
            </div>
          </div>

          {/* Right column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <p>info@onlyeducation.in</p>
              <p>+1 (123) 456-7890</p>
              <p>
                Office No.: 909, 9th floor, Satra Plaza, Palm Beach Rd, Phase 2,
                Sector 19D,
              </p>
              <p>Vashi, Navi Mumbai, Maharashtra 400703</p>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2024 Only Education</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="/terms" className="hover:underline">
              Terms and Conditions
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ Icon }: { Icon: any }) => (
  <a
    href="#"
    className=" hover:bg-orange-100 dark:hover:bg-accent p-2 rounded-full border transition-colors"
  >
    <Icon size={20} />
  </a>
);

const QuickLink = ({ text }: { text: string }) => (
  <a
    href="#"
    className="hover:bg-orange-100 dark:hover:bg-accent px-4 py-2 rounded-full text-sm border transition-colors"
  >
    {text}
  </a>
);

const Logo = () => (
  <div className="font-bold text-6xl tracking-tight bg-clip-text text-transparent  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white">
    Only Edu
    <span className="text-orange-400">●</span>
  </div>
);

export default Footer;
