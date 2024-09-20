"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Montserrat } from "next/font/google";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const Footer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    agreePrivacy: false,
    agreeCommunication: true,
  });

  const [formErrors, setFormErrors] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the Privacy Policy checkbox is checked
    if (!formData.agreePrivacy) {
      setFormErrors("You must agree to the Privacy Policy.");
      return;
    }

    // Reset error and success messages if the form is valid
    setFormErrors("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/newContactLead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit data");
      }

      // Reset form data on success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        agreePrivacy: false,
        agreeCommunication: true,
      });

      // Set success message
      setSuccessMessage("Thank you for connecting with us! We'll be in touch soon.");

    } catch (error: any) {
      console.error("Error submitting form data:", error);
      setFormErrors(error.message || "An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div
      className={`w-full p-6 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-lg flex flex-col items-center rounded-t-3xl shadow-lg border-t border-white/20 ${font.className}`}
    >
      {/* Contact Section */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mt-4 mb-6">
        {/* Left column: Title */}
        <div className="w-full md:w-1/2 text-left md:text-left mb-6 md:mb-0">
          <h2 className="text-6xl sm:text-8xl leading-tight text-white">
            <span className="text-gold block">Connect</span>
            <span className="block">With Us!</span>
          </h2>
        </div>

        {/* Right column: Form */}
        <div className="w-full md:w-1/2">
          {/* Message Display Section */}
          <div className="mb-4">
            {formErrors && (
              <div className="bg-red-500/90 text-white text-center rounded-lg px-4 py-3 mb-4 shadow-md border border-red-700">
                {formErrors}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-500/90 text-white text-center rounded-lg px-4 py-3 mb-4 shadow-md border border-green-700">
                {successMessage}
              </div>
            )}
          </div>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col text-left md:flex-row gap-4">
              <div className="flex flex-col w-full">
                <Label htmlFor="firstName" className="text-white mb-1 ml-1 cursor-pointer">
                  First Name <span className="text-gold">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  className="bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-md px-3 py-1.5"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <Label htmlFor="lastName" className="text-white mb-1 ml-1 cursor-pointer">
                  Last Name <span className="text-gold">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-md px-3 py-1.5"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col text-left w-full">
              <Label htmlFor="email" className="text-white mb-1 ml-1 cursor-pointer">
                Email <span className="text-gold">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-md px-3 py-1.5"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col text-left w-full">
              <Label htmlFor="phone" className="text-white mb-1 ml-1 cursor-pointer">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone Number"
                className="bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-md px-3 py-1.5"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Checkbox for agreeing to the Privacy Policy */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreePrivacy"
                className="w-4 h-4 text-indigo-600 bg-white/10 border border-white/20 rounded focus:ring-0 focus:ring-offset-0"
                checked={formData.agreePrivacy}
                onChange={handleChange}
                required
              />
              <Label htmlFor="agreePrivacy" className="text-white text-sm cursor-pointer">
                I agree to the{" "}
                <Link
                  href="https://app.termly.io/document/privacy-policy/b4f9f1c1-a729-4a08-8adb-dba43f6604a7"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-indigo-400 hover:text-indigo-300"
                >
                  Privacy Policy
                </Link>
                <span className="ml-1 text-gold">*</span>
              </Label>
            </div>

            {/* Checkbox for agreeing to receive electronic communication */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeCommunication"
                className="w-4 h-4 text-indigo-600 bg-white/10 border border-white/20 rounded focus:ring-0 focus:ring-offset-0"
                checked={formData.agreeCommunication}
                onChange={handleChange}
              />
              <Label htmlFor="agreeCommunication" className="text-white text-sm cursor-pointer">
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
      </div>

      {/* Footer Section */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl justify-between items-center border-t border-white/20 pt-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
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
          <ul className="flex flex-col md:flex-row space-x-0 md:space-x-8 items-center md:items-start">
            <li>
              <Link
                target="_blank"
                href="https://app.termly.io/document/privacy-policy/b4f9f1c1-a729-4a08-8adb-dba43f6604a7"
                rel="noreferrer"
                className="text-white transition-colors hover:text-gray-300"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/termsOfUse"
                className="text-white transition-colors hover:text-gray-300"
              >
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center text-white space-x-2 mt-4 md:mt-0">
          <div className="text-lg">©</div>
          <span>Zelos Inc. 2024</span>
        </div>
      </div>
    </div>
  );
};
