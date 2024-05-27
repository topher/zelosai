// StrategyLayout.tsx
'use client'

// First, you might want to import icons from a library such as react-icons
import { AiOutlineBulb, AiOutlineTeam, AiOutlineDollarCircle, AiOutlineTag, AiOutlineProject, AiOutlineDatabase, AiOutlineHeart } from 'react-icons/ai'; // Just examples, use icons relevant to your data


import React, { useState } from 'react';
// import Menu from "@/components/ui/menu";
import NestedCard from "@/components/nestedCard";
import { business_model } from "@/app/data"; // Assuming connectors data defined here
import { BusinessModel } from '@/app/types';

const businessModel: BusinessModel = business_model;

const StrategyLayout = () => {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <h1 className="col-span-full text-4xl font-bold mb-8 text-white">Strategy Dashboard</h1>

      {/* Customer Segments */}
      <div className="glassmorphic-card">
        <h2 className="text-2xl font-semibold mb-4">Customer Segments</h2>
        {Object.values(businessModel.customerSegments).map((segment, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineTeam />}
            title={segment.name}
            description={segment.description}
            bgColor="bg-purple-500" // Lighter background color
          />
        ))}
      </div>

      {/* Value Propositions */}
      <div className="glassmorphic-card">
        <h2 className="text-2xl font-semibold mb-4">Value Propositions</h2>
        {Object.values(businessModel.valuePropositions).map((prop, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineBulb />}
            title={prop.name}
            description={prop.description}
            bgColor="bg-green-500" // Lighter background color
          />
        ))}
      </div>

      {/* Channels */}
      <div className="glassmorphic-card">
        <h2 className="text-2xl font-semibold mb-4">Channels</h2>
        {Object.values(businessModel.channels).map((channel, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineDollarCircle />}
            title={channel.name}
            description={channel.description}
            bgColor="bg-blue-500" // Lighter background color
          />
        ))}
      </div>

      {/* Customer Relationships */}
      <div className="glassmorphic-card">
        <h2 className="text-2xl font-semibold mb-4">Customer Relationships</h2>
        {Object.values(businessModel.customerRelationships).map((relationship, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineHeart />} // Replace with the actual icon
            title={relationship.name}
            description={relationship.description}
            bgColor="bg-red-500" // Lighter background color
          />
        ))}
      </div>

      {/* Revenue Streams */}
      <div className="glassmorphic-card">
        <h2 className="text-2xl font-semibold mb-4">Revenue Streams</h2>
        {Object.values(businessModel.revenueStreams).map((stream, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineDollarCircle />}
            title={stream.name}
            description={stream.description}
            bgColor="bg-yellow-500" // Lighter background color
          />
        ))}
      </div>

      {/* Key Resources */}
      <div className="glassmorphic-card">
        <h2 className="text-2xl font-semibold mb-4">Key Resources</h2>
        {Object.values(businessModel.keyResources).map((resource, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineDatabase />} // Replace with the actual icon
            title={resource.name}
            description={resource.description}
            bgColor="bg-teal-500" // Lighter background color
          />
        ))}
      </div>

      {/* Key Activities */}
      <div className="glassmorphic-card">
        <h2 className="text-2xl font-semibold mb-4">Key Activities</h2>
        {Object.values(businessModel.keyActivities).map((activity, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineProject />} // Replace with the actual icon
            title={activity.name}
            description={activity.description}
            bgColor="bg-orange-500" // Lighter background color
          />
        ))}
      </div>

      {/* Key Partners */}
      <div className="glassmorphic-card">
        <h2 className="text-2xl font-semibold mb-4">Key Partners</h2>
        {Object.values(businessModel.keyPartners).map((partner, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineHeart />} // Replace with the actual icon
            title={partner.name}
            description={partner.description}
            bgColor="bg-lime-500" // Lighter background color
          />
        ))}
      </div>

      {/* Costs */}
      <div className="glassmorphic-card">
        <h2 className="text-2xl font-semibold mb-4">Cost</h2>
        {Object.values(businessModel.cost).map((cost, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineTag />} // Replace with the actual icon
            title={cost.name}
            description={cost.description}
            bgColor="bg-gray-500" // Lighter background color
          />
        ))}
      </div>
    </div>
  );
};

export default StrategyLayout;
