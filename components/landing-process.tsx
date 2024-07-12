"use client";

import React from "react";

export const LandingProcess = () => {
  return (
    <div className="bg-gray-800 text-white py-16 px-4">
      <h2 className="text-4xl text-center font-extrabold mb-10">How It Works</h2>
      <div className="relative flex flex-col items-start space-y-12 mx-auto" style={{ width: "80%" }}>
        <div className="absolute h-full left-6 flex flex-col items-center" style={{ borderLeft: "2px dotted #32CD32" }}>
          <div className="absolute top-0 left-0 w-1 h-full bg-transparent"></div>
        </div>
        
        <div className="flex items-center w-full relative z-10">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-xl font-bold absolute left-0">1</div>
          <div className="ml-16">
            <h3 className="text-xl font-bold mb-2">Capture Essence</h3>
            <p>(1 Week) Design your AI&apos;s voice, knowledge, and appearance.</p>
          </div>
        </div>
        
        <div className="flex items-center w-full relative z-10">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-xl font-bold absolute left-0">2</div>
          <div className="ml-16">
            <h3 className="text-xl font-bold mb-2">Build Vault</h3>
            <p>(2 Weeks) Curate the knowledge base for personalized AI responses.</p>
          </div>
        </div>
        
        <div className="flex items-center w-full relative z-10">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-xl font-bold absolute left-0">3</div>
          <div className="ml-16">
            <h3 className="text-xl font-bold mb-2">Forge Connection</h3>
            <p>(1 Week) Beta test and refine your AI for optimal performance.</p>
          </div>
        </div>
        
        <div className="flex items-center w-full relative z-10">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-xl font-bold absolute left-0">4</div>
          <div className="ml-16">
            <h3 className="text-xl font-bold mb-2">Evolve</h3>
            <p>(Ongoing) Continuous learning and adaptation for lasting value.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
