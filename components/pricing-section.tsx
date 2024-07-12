"use client";

import React from "react";
import { FaCheck } from "react-icons/fa";

export const PricingSection = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-4">
      <h2 className="text-4xl text-center font-extrabold mb-10 text-white">Pricing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        <div className="flex flex-col items-center bg-gray-800 rounded-lg p-8 text-center shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-700">
          <h3 className="text-3xl font-bold mb-4 text-white">Bronze</h3>
          <p className="text-2xl mb-4 text-white">
            <span className="text-4xl font-extrabold">$1k</span>
            <span className="text-lg"> / mo</span>
          </p>
          <p className="text-lg mb-4 text-gray-400">For small content teams just starting with AI tools.</p>
          <ul className="text-lg text-gray-300">
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Digital Twin Launch Program (w/ pilot)</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Basic Platform Access</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> 10k Training Credits / mo</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> 5k Generation Credits / mo</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> 10GB Data Storage</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> 5GB Knowledge Vault Storage</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Basic Customer Support (24-48 hrs)</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Unlimited Photo Upscaling</li>
          </ul>
        </div>
        
        <div className="flex flex-col items-center bg-gray-800 rounded-lg p-8 text-center shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-700">
          <h3 className="text-3xl font-bold mb-4 text-white">Silver</h3>
          <p className="text-2xl mb-4 text-white">
            <span className="text-4xl font-extrabold">$2.5k</span>
            <span className="text-lg"> / mo</span>
          </p>
          <p className="text-lg mb-4 text-gray-400">Ideal for medium-sized teams and growing agencies.</p>
          <ul className="text-lg text-gray-300">
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Everything in Bronze, plus:</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Standard Platform Access</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> 25k Training Credits / mo</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> 15k Generation Credits / mo</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> 50GB Data Storage</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> 25GB Knowledge Vault Storage</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Priority Customer Support (12-24 hrs)</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Custom AI Model Creation</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Live Data Integration</li>
          </ul>
        </div>
        
        <div className="flex flex-col items-center bg-gray-800 rounded-lg p-8 text-center shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-700">
          <h3 className="text-3xl font-bold mb-4 text-white">Gold</h3>
          <p className="text-2xl mb-4 text-white">
            <span className="text-4xl font-extrabold">$5k</span>
            <span className="text-lg"> / mo</span>
          </p>
          <p className="text-lg mb-4 text-gray-400">Best for large teams and established agencies needing advanced tools.</p>
          <ul className="text-lg text-gray-300">
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Everything in Silver, plus:</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Advanced Platform Access</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> 50k Training Credits / mo</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> 25k Generation Credits / mo</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> 100GB Data Storage</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> 50GB Knowledge Vault Storage</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Dedicated Customer Support (same-day)</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Knowledge Extraction Capabilities</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Content Collaboration Tools</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> User Personas & Profiles</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Reporting & Analytics</li>
          </ul>
        </div>
        
        <div className="flex flex-col items-center bg-gray-800 rounded-lg p-8 text-center shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-700">
          <h3 className="text-3xl font-bold mb-4 text-white">Enterprise</h3>
          <p className="text-2xl mb-4 text-white">
            <span className="text-4xl font-extrabold">Custom</span>
            <span className="text-lg"> Pricing</span>
          </p>
          <p className="text-lg mb-4 text-gray-400">Tailored for enterprise-level teams with specific needs and large-scale operations.</p>
          <ul className="text-lg text-gray-300">
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Everything in Gold, plus:</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Custom Platform Access</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Unlimited Training Credits</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Unlimited Generation Credits</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Custom Data Storage</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Custom Knowledge Vault Storage</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Dedicated Account Manager</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Workflow Automation</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Conditional Branching</li>
            <li className="mb-2 flex items-center"><span className="bg-green-500 rounded-full p-1"><FaCheck className="text-white" /></span> Customizable Dashboards</li>
          </ul>
        </div>
        
      </div>
    </div>
  );
};
