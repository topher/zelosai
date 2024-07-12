"use client";

import React from "react";

export const LandingProcess = () => {
  return (
    <>
      <h2 className="text-4xl text-center font-extrabold mb-10 text-white">How It Works</h2>
      <div className="bg-gray-800 py-16 text-white px-4 rounded-lg flex justify-center items-center">
        <div className="relative flex flex-col items-start space-y-12 mx-auto" style={{ width: "80%" }}>
          <div className="absolute h-full left-10 flex flex-col items-center">
            <div className="absolute top-16 bottom-16 w-1 bg-transparent flex items-center justify-center">
              <div style={{ height: "calc(100% - 20px)", borderLeft: "2px dotted #32CD32" }}></div>
            </div>
          </div>

          <div className="flex items-center w-full relative z-10">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold absolute left-0">1</div>
            <div className="ml-24">
              <h3 className="text-3xl font-bold mb-2">Capture Your Essence</h3>
              <p className="text-xl  text-gray-300">
                Design Your AI, Your Way. Shape the core elements of your AI companion – voice, knowledge, and appearance – to perfectly reflect your vision and strategic goals.
              </p>
            </div>
          </div>

          <div className="flex items-center w-full relative z-10">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold absolute left-0">2</div>
            <div className="ml-24">
              <h3 className="text-3xl font-bold mb-2">Build Your Knowledge Vault</h3>
              <p className="text-xl  text-gray-300">
                Craft the Intelligence of Your AI. Curate the knowledge base that will empower your AI companion to deliver insightful and personalized responses.
              </p>
            </div>
          </div>

          <div className="flex items-center w-full relative z-10">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold absolute left-0">3</div>
            <div className="ml-24">
              <h3 className="text-3xl font-bold mb-2">Forge the Connection</h3>
              <p className="text-xl  text-gray-300">
                Refine & Launch Your AI. Beta test your AI companion and provide feedback to ensure it delivers the exceptional experience you deserve.
              </p>
            </div>
          </div>

          <div className="flex items-center w-full relative z-10">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold absolute left-0">4</div>
            <div className="ml-24">
              <h3 className="text-3xl font-bold mb-2">Invest in your Legacy</h3>
              <p className="text-xl  text-gray-300">
                Your AI, Always Evolving. Your AI companion continuously learns and adapts based on your interactions, creating a lasting and dynamic partnership.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
