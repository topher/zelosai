"use client";

import React from "react";

export const LandingProcess = () => {
  return (
    <><h2 className="text-4xl text-center font-extrabold mb-10  text-white">How It Works</h2>
    <div className="bg-gray-800 py-16  text-white px-4">
      <div className="relative flex flex-col items-start space-y-12 mx-auto" style={{ width: "80%" }}>
        <div className="absolute h-full left-10 flex flex-col items-center">
          <div className="absolute top-16 bottom-16 w-1 bg-transparent flex items-center justify-center">
            <div style={{ height: "calc(100% - 20px)", borderLeft: "2px dotted #32CD32" }}></div>
          </div>
        </div>
        
        <div className="flex items-center w-full relative z-10">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold absolute left-0">1</div>
          <div className="ml-24"> {/* Increased margin-left */}
            <h3 className="text-3xl font-bold mb-2">Capture Essence</h3>
            <p className="text-xl">(1 Week) Design your AI&apos;s voice, knowledge, and appearance.</p>
          </div>
        </div>
        
        <div className="flex items-center w-full relative z-10">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold absolute left-0">2</div>
          <div className="ml-24"> {/* Increased margin-left */}
            <h3 className="text-3xl font-bold mb-2">Build Vault</h3>
            <p className="text-xl">(2 Weeks) Curate the knowledge base for personalized AI responses.</p>
          </div>
        </div>
        
        <div className="flex items-center w-full relative z-10">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold absolute left-0">3</div>
          <div className="ml-24"> {/* Increased margin-left */}
            <h3 className="text-3xl font-bold mb-2">Forge Connection</h3>
            <p className="text-xl">(1 Week) Beta test and refine your AI for optimal performance.</p>
          </div>
        </div>
        
        <div className="flex items-center w-full relative z-10">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold absolute left-0">4</div>
          <div className="ml-24"> {/* Increased margin-left */}
            <h3 className="text-3xl font-bold mb-2">Evolve</h3>
            <p className="text-xl">(Ongoing) Continuous learning and adaptation for lasting value.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
