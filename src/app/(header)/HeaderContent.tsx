import { useState, useEffect } from "react";
import {
  Menu,
  ChevronDown,
  User,
  UserPlus,
  Building2,
  Landmark,
  Train,
  GraduationCap,
  Scale,
  Briefcase,
  BookMarked,
  Shield,
  ArrowRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeBtn from "@/components/ui/ThemeBtn";
// import ThemeBtn from "@/components/ThemeBtn";

const examCategories = [
  {
    title: "Engineering",
    icon: Building2,
    links: [
      "JEE Mains",
      "JEE Advanced",
      "PERA CET",
      "MHCET",
      "AEEE",
      "View all Engineering →",
    ],
  },
  {
    title: "Management",
    icon: Landmark,
    links: [
      "CAT",
      "XAT",
      "CMAT",
      "MAT",
      "IBSAT",
      "SNAP",
      "NMAT",
      "View all Management →",
    ],
  },
  {
    title: "Medical",
    icon: Train,
    links: [
      "NEET",
      "NEET PG",
      "NEET SS",
      "INI-CET",
      "FMGE",
      "NBE FET",
      "DNB PDCET",
      "View all Medicals →",
    ],
  },
  {
    title: "Technology",
    icon: GraduationCap,
    links: ["Pandashiksha", "Git", "Typescript", "Django", "Vue", "View all Technology →"],
  },
  {
    title: "Civil Services & Judiciary",
    icon: Scale,
    links: [
      "UPSC Prelims",
      "UPSC Mains",
      "State PCS",
      "Judiciary",
      "View all Civil →",
    ],
  },
  // {
  //   title: "MBA & Management",
  //   icon: Briefcase,
  //   links: ["CAT", "XAT", "NMAT", "SNAP", "MAT", "View all MBA →"],
  // },
  {
    title: "CUET & UG",
    icon: BookMarked,
    links: ["CUET UG", "CUET PG", "BBA", "BCA", "View all CUET →"],
  },
  {
    title: "Defence & Police",
    icon: Shield,
    links: ["CDS", "AFCAT", "NDA", "Police Constable", "View all Defence →"],
  },
];

// Simplified navigation with removed items
const navItems = [
  { label: "Exams", hasDropdown: true },
  { label: "Test Series", href: "/test-series" },
  { label: "Live Tests", href: "/live-tests" },
  { label: "PYQs", href: "/pyqs" },
];

export function HeaderContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMegaMenuToggle = (show: boolean) => {
    setShowMegaMenu(show);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 z-40 transition-all duration-300 w-full backdrop-blur-md bg-white"
        style={{
          // backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderBottom: `1px solid ${"rgba(209, 213, 219, 0.3)"
          }`,
        }}
        animate={{
          boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "none",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Mobile Layout */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* Logo */}
            <motion.div
              className="flex items-center flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center gap-3">
                <motion.div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-accent-600) 100%)",
                  }}
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <GraduationCap size={20} className="text-white" />
                </motion.div>
                <span
                  className="font-heading font-bold text-lg whitespace-nowrap"
                  style={{ color: "var(--color-text-900)" }}
                >
                  OnlyExams
                </span>
              </Link>
            </motion.div>

            {/* Mobile Right Section */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <motion.button
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: "var(--color-bg)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Menu
                      size={24}
                      style={{ color: "var(--color-text-900)" }}
                    />
                  </motion.button>
                </SheetTrigger>

                <SheetContent side="right" className="w-full max-w-sm p-0">
                  <div
                    className="flex flex-col h-full"
                    style={{ backgroundColor: "var(--color-surface)" }}
                  >
                    {/* Mobile Header */}
                    <div
                      className="flex items-center justify-between p-6 border-b"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-accent-600) 100%)",
                          }}
                        >
                          <GraduationCap size={18} className="text-white" />
                        </div>
                        <span
                          className="font-heading font-bold"
                          style={{ color: "var(--color-text-900)" }}
                        >
                          OnlyExams
                        </span>
                      </div>
                      <button onClick={() => setIsMobileMenuOpen(false)}>
                        <X
                          size={24}
                          style={{ color: "var(--color-text-500)" }}
                        />
                      </button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-2">
                        {navItems.map((item, index) => (
                          <motion.a
                            key={index}
                            href={item.href || "#"}
                            className="flex items-center justify-between py-3 px-4 rounded-lg transition-colors duration-200"
                            style={{ color: "var(--color-text-900)" }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            whileHover={{
                              backgroundColor: "var(--color-bg)",
                              color: "var(--color-primary-600)",
                            }}
                          >
                            <span className="font-medium">{item.label}</span>
                            {item.hasDropdown && <ChevronDown size={16} />}
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Auth & CTA */}
                    <div
                      className="p-6 border-t space-y-4"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1">
                          <User size={16} className="mr-2" />
                          Login
                        </Button>
                        <Button className="flex-1">
                          <UserPlus size={16} className="mr-2" />
                          Sign Up
                        </Button>
                      </div>
                      <ThemeBtn
                        variant="sm"
                        text={
                          <>
                            Start Free Test
                            <ArrowRight size={16} className="ml-2" />
                          </>
                        }
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Left Section - Logo */}
            <motion.div
              className="flex items-center flex-shrink-0 min-w-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-accent-600) 100%)",
                  }}
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <GraduationCap size={22} className="text-white" />
                </motion.div>
                <span
                  className="font-heading font-bold text-xl whitespace-nowrap"
                  style={{ color: "var(--color-text-900)" }}
                >
                  OnlyExams
                </span>
              </Link>
            </motion.div>

            {/* Center Section - Navigation */}
            <nav className="flex items-center justify-center flex-1 mx-8 ">
              <div className="flex items-center gap-8">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() =>
                      item.hasDropdown && handleMegaMenuToggle(true)
                    }
                    onMouseLeave={() =>
                      item.hasDropdown && handleMegaMenuToggle(false)
                    }
                  >
                    <motion.a
                      href={item.href || "#"}
                      className="flex items-center gap-1 font-medium transition-colors duration-200 py-2 px-1 whitespace-nowrap"
                      style={{
                        color: "var(--color-text-700)",
                        fontSize: "var(--fs-body)",
                      }}
                      whileHover={{
                        color: "var(--color-primary-600)",
                        scale: 1.05,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                      {item.hasDropdown && (
                        <motion.div
                          animate={{ rotate: showMegaMenu ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      )}
                    </motion.a>
                  </div>
                ))}
              </div>
            </nav>

            {/* Right Section - Utilities */}
            <div className="flex items-center gap-3 flex-shrink-0 min-w-0">
              {/* Auth Links */}
              <div className="hidden lg:flex items-center gap-1">
                <motion.a
                  href="#"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-200"
                  style={{ color: "var(--color-text-700)" }}
                  whileHover={{
                    color: "var(--color-primary-600)",
                    backgroundColor: "var(--color-bg)",
                  }}
                >
                  <User size={16} />
                  <span className="text-sm font-medium">Login</span>
                </motion.a>

                <motion.a
                  href="#"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-200"
                  style={{ color: "var(--color-text-700)" }}
                  whileHover={{
                    color: "var(--color-primary-600)",
                    backgroundColor: "var(--color-bg)",
                  }}
                >
                  <UserPlus size={16} />
                  <span className="text-sm font-medium">Sign Up</span>
                </motion.a>
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0"
              >
                <ThemeBtn
                  text={
                    <>
                      Start Free Test
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  }
                  variant="sm"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown - Only for Desktop */}
        <AnimatePresence>
          {showMegaMenu && (
            <motion.div
              className="absolute left-0 right-0 top-full bg-white shadow-2xl border-t z-50"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onMouseEnter={() => handleMegaMenuToggle(true)}
              onMouseLeave={() => handleMegaMenuToggle(false)}
            >
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
                <div className="mb-6">
                  <h3
                    className="font-heading font-semibold text-xl mb-2"
                    style={{ color: "var(--color-text-900)" }}
                  >
                    Browse Exam Categories
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-500)" }}
                  >
                    Explore thousands of practice questions and mock tests
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {examCategories.map((category, catIndex) => (
                    <motion.div
                      key={catIndex}
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: catIndex * 0.05 }}
                    >
                      <div className="flex items-center gap-3 mb-4 p-3 rounded-lg transition-colors duration-200 group-hover:bg-gray-50">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: "var(--color-primary-50)",
                            color: "var(--color-primary-600)",
                          }}
                        >
                          <category.icon size={20} />
                        </div>
                        <h4
                          className="font-heading font-semibold"
                          style={{ color: "var(--color-text-900)" }}
                        >
                          {category.title}
                        </h4>
                      </div>

                      <div className="space-y-2 pl-3">
                        {category.links.map((link, linkIndex) => (
                          <motion.a
                            key={linkIndex}
                            href="#"
                            className="block text-sm hover:underline transition-colors duration-200 py-1"
                            style={{
                              color:
                                linkIndex === category.links.length - 1
                                  ? "var(--color-primary-600)"
                                  : "var(--color-text-600)",
                            }}
                            whileHover={{
                              x: 4,
                              color: "var(--color-primary-600)",
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {link}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div
                  className="mt-8 pt-6 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-900)" }}
                      >
                        {`Can't find your exam?`}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-text-500)" }}
                      >
                        {`We're constantly adding new exams and study materials`}
                      </p>
                    </div>
                    <Button variant="outline" className="px-6">
                      Request New Exam
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
