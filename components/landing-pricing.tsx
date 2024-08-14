"use client";

import React from "react";
import { FaCheck } from "react-icons/fa";

export const PricingSection = () => {
  return (
    <div className="bg-gray-900 text-white py-24 px-6">
      <h2 className="text-6xl text-center font-extrabold mb-12">
        Pricing
      </h2>
      <p className="text-center text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
        Select the plan that best fits your needs and start building your digital future today.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center bg-gray-800 rounded-xl p-8 text-center shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-700 ${
              plan.isPopular ? 'border-4 border-indigo-500' : ''
            }`}
            style={{ minHeight: '500px' }} // Ensure consistent card height
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                Most Popular
              </div>
            )}
            <h3 className="text-3xl font-bold mb-4 text-white">{plan.name}</h3>
            <p className="text-2xl mb-4 text-white">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              <span className="text-lg"> / mo</span>
            </p>
            <p className="text-lg mb-6 text-gray-400">{plan.description}</p>
            <ul className="text-lg text-gray-300 space-y-3 mb-6 text-left w-full">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className={`flex items-center space-x-2 py-2 ${i !== plan.features.length - 1 ? 'border-b border-gray-600' : ''}`}
                >
                  <span className="bg-green-500 rounded-full p-1">
                    <FaCheck className="text-white" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-auto px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 rounded-lg transition-transform transform hover:scale-105">
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const plans = [
  {
    name: "Bronze",
    price: "$1k",
    description: "For small content teams just starting with AI tools.",
    features: [
      "Digital Twin Launch Program (w/ pilot)",
      "Basic Platform Access",
      "10k Training Credits / mo",
      "5k Generation Credits / mo",
      "10GB Data Storage",
      "5GB Knowledge Vault Storage",
      "Basic Customer Support (24-48 hrs)",
      "Unlimited Photo Upscaling",
    ],
  },
  {
    name: "Silver",
    price: "$2.5k",
    description: "Ideal for medium-sized teams and growing agencies.",
    features: [
      "Everything in Bronze, plus:",
      "Standard Platform Access",
      "25k Training Credits / mo",
      "15k Generation Credits / mo",
      "50GB Data Storage",
      "25GB Knowledge Vault Storage",
      "Priority Customer Support (12-24 hrs)",
      "Custom AI Model Creation",
      "Live Data Integration",
    ],
    isPopular: true, // Marking this as the most popular plan
  },
  {
    name: "Gold",
    price: "$5k",
    description: "Best for large teams and established agencies needing advanced tools.",
    features: [
      "Everything in Silver, plus:",
      "Advanced Platform Access",
      "50k Training Credits / mo",
      "25k Generation Credits / mo",
      "100GB Data Storage",
      "50GB Knowledge Vault Storage",
      "Dedicated Customer Support (same-day)",
      "Knowledge Extraction Capabilities",
      "Content Collaboration Tools",
      "User Personas & Profiles",
      "Reporting & Analytics",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored for enterprise-level teams with specific needs and large-scale operations.",
    features: [
      "Everything in Gold, plus:",
      "Custom Platform Access",
      "Unlimited Training Credits",
      "Unlimited Generation Credits",
      "Custom Data Storage",
      "Custom Knowledge Vault Storage",
      "Dedicated Account Manager",
      "Workflow Automation",
      "Conditional Branching",
      "Customizable Dashboards",
    ],
  },
];
