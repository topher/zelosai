// Combined Footer Component
"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Montserrat } from "next/font/google";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const Footer = () => (
  <div
    className={`w-full p-6 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-lg flex flex-col items-center rounded-t-3xl shadow-lg border-t border-white/20 ${font.className}`}
  >
    {/* Contact Section */}
    <div className="w-full max-w-4xl text-center mb-6">
      <h2 className="text-4xl mb-6 text-white">Connect With Us!</h2>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <Label htmlFor="first-name" className="text-white mb-1 cursor-pointer">
              First Name
            </Label>
            <Input
              id="first-name"
              type="text"
              placeholder="First Name"
              className="bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-md px-3 py-1.5"
            />
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="last-name" className="text-white mb-1 cursor-pointer">
              Last Name
            </Label>
            <Input
              id="last-name"
              type="text"
              placeholder="Last Name"
              className="bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-md px-3 py-1.5"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <Label htmlFor="email" className="text-white mb-1 cursor-pointer">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className="bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-md px-3 py-1.5"
          />
        </div>
        <div className="flex flex-col w-full">
          <Label htmlFor="phone" className="text-white mb-1 cursor-pointer">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            className="bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-md px-3 py-1.5"
          />
        </div>

        {/* Checkbox for agreeing to the Privacy Policy */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="agree-privacy"
            className="w-4 h-4 text-indigo-600 bg-white/10 border border-white/20 rounded focus:ring-0 focus:ring-offset-0"
          />
          <Label htmlFor="agree-privacy" className="text-white text-sm cursor-pointer">
            I agree to the{" "}
            <Link
              href="https://app.termly.io/document/privacy-policy/b4f9f1c1-a729-4a08-8adb-dba43f6604a7"
              target="_blank"
              rel="noreferrer"
              className="underline text-indigo-400 hover:text-indigo-300"
            >
              Privacy Policy
            </Link>
          </Label>
        </div>

        {/* Checkbox for agreeing to receive electronic communication */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="agree-communication"
            className="w-4 h-4 text-indigo-600 bg-white/10 border border-white/20 rounded focus:ring-0 focus:ring-offset-0"
          />
          <Label htmlFor="agree-communication" className="text-white text-sm cursor-pointer">
            I agree to receive electronic communication from Zelos.
          </Label>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-md shadow-md transform transition-transform hover:scale-105 hover:from-pink-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>

    {/* Footer Section */}
    <div className="flex flex-col md:flex-row w-full max-w-5xl justify-between items-center border-t border-white/20 pt-6">
      <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
        <div className="flex items-center mb-2">
          {/* <BrandLogo /> */}
        </div>
        {/* Commented Links */}
        {/* 
        <ul className="hidden sm:flex space-x-4">
          <li>
            <Link
              href="#home"
              className="text-white transition-colors hover:text-gray-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#problem"
              className="text-white transition-colors hover:text-gray-300"
            >
              Problem
            </Link>
          </li>
          <li>
            <Link
              href="#solution"
              className="text-white transition-colors hover:text-gray-300"
            >
              Solution
            </Link>
          </li>
          <li>
            <Link
              href="#working"
              className="text-white transition-colors hover:text-gray-300"
            >
              How it works
            </Link>
          </li>
          <li>
            <Link
              href="#team"
              className="text-white transition-colors hover:text-gray-300"
            >
              Team
            </Link>
          </li>
          <li>
            <Link
              href="#expert"
              className="text-white transition-colors hover:text-gray-300"
            >
              Experts
            </Link>
          </li>
        </ul> 
        */}
        <ul className="flex flex-col md:flex-row space-x-0 md:space-x-4 items-center md:items-start">
          <Link
            target="_blank"
            href="https://app.termly.io/document/privacy-policy/b4f9f1c1-a729-4a08-8adb-dba43f6604a7"
            rel="noreferrer"
            className="text-white transition-colors hover:text-gray-300"
          >
            Privacy
          </Link>
          <Link
            href="/termsOfUse"
            className="text-white transition-colors hover:text-gray-300"
          >
            Terms of Use
          </Link>
        </ul>
      </div>
      <div className="flex items-center text-white space-x-2 mt-4 md:mt-0">
        <div className="text-lg">©</div>
        <span>Zelos Inc. 2024</span>
      </div>
    </div>
  </div>
);
