"use client";

import React from "react";

export const LandingProcess = () => {
  return (
    <>
    <h2 className=" text-white text-4xl text-center font-extrabold mb-10">How It Works</h2>
    <div className="bg-gray-800 text-white py-16 px-4">
      <div className="relative flex flex-col items-start space-y-12 mx-auto" style={{ width: "80%" }}>
        <div className="absolute h-full left-10 flex flex-col items-center" style={{ borderLeft: "3px dotted #32CD32" }}>
          <div className="absolute top-0 left-0 w-1 h-full bg-transparent"></div>
        </div>
        
        <div className="flex items-center w-full relative z-10">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold absolute left-0">1</div>
          <div className="ml-16">
            <h3 className="text-3xl font-bold mb-2">Capture Your Essence</h3>
            <p className="text-xl">Design your AI's voice, knowledge, and appearance to.</p>
          </div>
        </div>
        
        <div className="flex items-center w-full relative z-10">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold absolute left-0">2</div>
          <div className="ml-16">
            <h3 className="text-3xl font-bold mb-2">Build Knowledge Bank</h3>
            <p className="text-xl">Curate the knowledge base for personalized AI responses.</p>
          </div>
        </div>
        
        <div className="flex items-center w-full relative z-10">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold absolute left-0">3</div>
          <div className="ml-16">
            <h3 className="text-3xl font-bold mb-2">Generate Content</h3>
            <p className="text-xl">Beta test and refine your AI for optimal performance.</p>
          </div>
        </div>
        
        <div className="flex items-center w-full relative z-10">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold absolute left-0">4</div>
          <div className="ml-16">
            <h3 className="text-3xl font-bold mb-2">Refine Your Content</h3>
            <p className="text-xl">Continuous learning and adaptation for lasting value.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
