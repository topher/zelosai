"use client";

import React from "react";

export const LandingProcess = () => {
  return (
    <div className="bg-gray-900 text-white py-24 px-6 md:px-12 lg:px-24">
      <h2 className="text-6xl text-center font-extrabold mb-12">
        How It Works
      </h2>
      <p className="text-center text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
        Our process is simple and effective, tailored to meet your brand's unique needs.
      </p>
      <div className="relative flex flex-col space-y-16 mx-auto max-w-5xl">
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-center lg:flex-row flex-col">
            {/* Step number with dotted line */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 flex items-center justify-center text-2xl font-extrabold mb-4 lg:mb-0 relative">
              {index + 1}
              {/* Dotted line for connecting steps */}
              {index < steps.length - 1 && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-16 border-l-2 border-dotted border-gray-400"></div>
                </div>
              )}
            </div>
            {/* Step content */}
            <div className="lg:ml-8 flex flex-col space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">{step.title}</h3>
              <p className="text-lg md:text-xl text-gray-300">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const steps = [
  {
    title: "Capture Your Essence",
    description:
      "Design Your AI, Your Way. Shape the core elements of your AI companion – voice, knowledge, and appearance – to perfectly reflect your vision and strategic goals.",
  },
  {
    title: "Build Your Knowledge Vault",
    description:
      "Craft the Intelligence of Your AI. Curate the knowledge base that will empower your AI companion to deliver insightful and personalized responses.",
  },
  {
    title: "Forge the Connection",
    description:
      "Refine & Launch Your AI. Beta test your AI companion and provide feedback to ensure it delivers the exceptional experience you deserve.",
  },
  {
    title: "Invest in your Legacy",
    description:
      "Your AI, Always Evolving. Your AI companion continuously learns and adapts based on your interactions, creating a lasting and dynamic partnership.",
  },
];
