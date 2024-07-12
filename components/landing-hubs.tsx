"use client";

import React from "react";

export const LandingHubs = () => {
  return (
    <div className="bg-gray-700 text-white py-16 px-4">
      <h2 className="text-4xl text-center font-extrabold mb-10">Platform Hubs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Strategy Hub</h3>
          <p>Optimize your digital twin's content strategy.</p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Content Hub</h3>
          <p>Generate content at scale.</p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Experience Hub</h3>
          <p>Design interactive experiences.</p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Marketplace Hub</h3>
          <p>License your digital twin for new revenue streams.</p>
        </div>
      </div>
    </div>
  );
};