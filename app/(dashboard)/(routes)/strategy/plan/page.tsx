"use client"
import {
  AiOutlineBulb,
  AiOutlineTeam,
  AiOutlineDollarCircle,
  AiOutlineTag,
  AiOutlineProject,
  AiOutlineDatabase,
  AiOutlineHeart,
} from "react-icons/ai";
import React from "react";
import NestedCard from "@/components/nestedCard";
import { business_model } from "@/app/data";
import { BusinessModel } from "@/app/types";

const businessModel: BusinessModel = business_model;

const StrategyLayout = () => {
  return (
    <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <h1 className="col-span-full text-4xl font-bold mb-12 text-[#111827]">
        Strategy Dashboard
      </h1>

      {/* Customer Segments */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-[#111827]">
          Customer Segments
        </h2>
        {Object.values(businessModel.customerSegments).map((segment, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineTeam />}
            title={segment.name}
            description={segment.description}
          />
        ))}
      </div>

      {/* Value Propositions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-[#111827]">
          Value Propositions
        </h2>
        {Object.values(businessModel.valuePropositions).map((prop, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineBulb />}
            title={prop.name}
            description={prop.description}
          />
        ))}
      </div>

      {/* Channels */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-[#111827]">Channels</h2>
        {Object.values(businessModel.channels).map((channel, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineDollarCircle />}
            title={channel.name}
            description={channel.description}
          />
        ))}
      </div>

      {/* Customer Relationships */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-[#111827]">
          Customer Relationships
        </h2>
        {Object.values(businessModel.customerRelationships).map(
          (relationship, index) => (
            <NestedCard
              key={index}
              icon={<AiOutlineHeart />}
              title={relationship.name}
              description={relationship.description}
            />
          )
        )}
      </div>

      {/* Revenue Streams */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-[#111827]">
          Revenue Streams
        </h2>
        {Object.values(businessModel.revenueStreams).map((stream, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineDollarCircle />}
            title={stream.name}
            description={stream.description}
          />
        ))}
      </div>

      {/* Key Resources */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-[#111827]">
          Key Resources
        </h2>
        {Object.values(businessModel.keyResources).map((resource, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineDatabase />}
            title={resource.name}
            description={resource.description}
          />
        ))}
      </div>

      {/* Key Activities */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-[#111827]">
          Key Activities
        </h2>
        {Object.values(businessModel.keyActivities).map((activity, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineProject />}
            title={activity.name}
            description={activity.description}
          />
        ))}
      </div>

      {/* Key Partners */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-[#111827]">
          Key Partners
        </h2>
        {Object.values(businessModel.keyPartners).map((partner, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineHeart />}
            title={partner.name}
            description={partner.description}
          />
        ))}
      </div>

      {/* Costs */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-[#111827]">Cost</h2>
        {Object.values(businessModel.cost).map((cost, index) => (
          <NestedCard
            key={index}
            icon={<AiOutlineTag />}
            title={cost.name}
            description={cost.description}
          />
        ))}
      </div>
    </div>
  );
};

export default StrategyLayout;
