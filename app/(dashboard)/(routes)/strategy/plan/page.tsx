"use client";
import React from "react";
import {
  AiOutlineTeam,
  AiOutlineBulb,
  AiOutlineDollarCircle,
  AiOutlineTag,
  AiOutlineProject,
  AiOutlineDatabase,
  AiOutlineHeart,
} from "react-icons/ai";
import Section from "@/app/(dashboard)/(routes)/strategy/components/businessModelSection";

const StrategyLayout = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-12 text-[#111827]">Strategy Dashboard</h1>

      {/* Sections */}
      <Section sectionName="customerSegments" sectionTitle="Customer Segments" icon={<AiOutlineTeam />} />
      <Section sectionName="valuePropositions" sectionTitle="Value Propositions" icon={<AiOutlineBulb />} />
      <Section sectionName="channels" sectionTitle="Channels" icon={<AiOutlineDollarCircle />} />
      <Section sectionName="customerRelationships" sectionTitle="Customer Relationships" icon={<AiOutlineHeart />} />
      <Section sectionName="revenueStreams" sectionTitle="Revenue Streams" icon={<AiOutlineDollarCircle />} />
      <Section sectionName="keyResources" sectionTitle="Key Resources" icon={<AiOutlineDatabase />} />
      <Section sectionName="keyActivities" sectionTitle="Key Activities" icon={<AiOutlineProject />} />
      <Section sectionName="keyPartners" sectionTitle="Key Partners" icon={<AiOutlineHeart />} />
      <Section sectionName="cost" sectionTitle="Costs" icon={<AiOutlineTag />} />
    </div>
  );
};

export default StrategyLayout;
