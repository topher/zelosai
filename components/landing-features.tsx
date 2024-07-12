"use client";

import React from "react";

export const LandingFeatures = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-4">
      <h2 className="text-4xl text-center font-extrabold mb-10">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center bg-gray-800 rounded-lg p-12 text-center shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-700 group">
          <div className="mb-6 relative">
            <img src="/rocket/rocket-dynamic-premium.png" alt="AI Assistant" className="w-48 h-48 mx-auto transition duration-300 group-hover:hidden"/>
            <img src="/rocket/rocket-dynamic-color.png" alt="AI Assistant" className="w-48 h-48 mx-auto hidden transition duration-300 group-hover:block"/>
          </div>
          <h3 className="text-3xl font-bold mb-4">AI Assistant</h3>
          <p className="text-xl  text-gray-300">Train AI on your brand&apos;s identity to engage customers and streamline processes.</p>
        </div>
        <div className="flex flex-col items-center bg-gray-800 rounded-lg p-12 text-center shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-700 group">
          <div className="mb-6 relative">
            <img src="/locker/locker-dynamic-premium.png" alt="Data Vault" className="w-48 h-48 mx-auto transition duration-300 group-hover:hidden"/>
            <img src="/locker/locker-dynamic-color.png" alt="Data Vault" className="w-48 h-48 mx-auto hidden transition duration-300 group-hover:block"/>
          </div>
          <h3 className="text-3xl font-bold mb-4">Data Vault</h3>
          <p className="text-xl  text-gray-300">Build a secure knowledge vault. You control your data, empowering your AI.</p>
        </div>
        <div className="flex flex-col items-center bg-gray-800 rounded-lg p-12 text-center shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-700 group">
          <div className="mb-6 relative">
            <img src="/painting-kit/paint-kit-dynamic-premium.png" alt="Content Engine" className="w-48 h-48 mx-auto transition duration-300 group-hover:hidden"/>
            <img src="/painting-kit/paint-kit-dynamic-color.png" alt="Content Engine" className="w-48 h-48 mx-auto hidden transition duration-300 group-hover:block"/>
          </div>
          <h3 className="text-3xl font-bold mb-4">Content Engine</h3>
          <p className="text-xl  text-gray-300">Create customized marketing materials for all channels.</p>
        </div>
        <div className="flex flex-col items-center bg-gray-800 rounded-lg p-12 text-center shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-700 group">
          <div className="mb-6 relative">
            <img src="/shield/shield-dynamic-premium.png" alt="IP Portfolio" className="w-48 h-48 mx-auto transition duration-300 group-hover:hidden"/>
            <img src="/shield/shield-dynamic-color.png" alt="IP Portfolio" className="w-48 h-48 mx-auto hidden transition duration-300 group-hover:block"/>
          </div>
          <h3 className="text-3xl font-bold mb-4">IP Portfolio</h3>
          <p className="text-xl  text-gray-300">Ensure clear ownership and control of your AI model and content.</p>
        </div>
      </div>
    </div>
  );
};
