import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-b from-background to-primary-50">
    <div className="container py-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <div className="relative h-8 w-8">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="ExamPrep Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl text-primary">ExamPrep</span>
          </Link>
          <p className="text-muted-foreground mb-4">
            Your one-stop destination for complete exam preparation. Learn, practice, improve, and succeed.
          </p>
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-primary-50 text-primary hover:bg-primary-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-primary-50 text-primary hover:bg-primary-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-primary-50 text-primary hover:bg-primary-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-primary-50 text-primary hover:bg-primary-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-youtube"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </Button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-primary">Exams</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Government
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Banking
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Teaching
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Engineering
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Medical
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-secondary">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-secondary">
                Study Material
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-secondary">
                Mock Tests
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-secondary">
                Previous Papers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-secondary">
                Video Lectures
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-secondary">
                Success Stories
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-accent">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-accent">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-accent">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-accent">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-accent">
                Press
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground">© 2025 ExamPrep. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  </footer>  )
}

export default Footer