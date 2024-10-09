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
import { Separator } from "@/components/ui/separator";
import StrategyLayout from "../StrategyLayout";

const BusinessPlan = () => {
  return (
    <StrategyLayout>
    <div className="space-y-8 p-6">
      {/* Sections */}
      <div>
        <Section
          sectionName="customerSegments"
          sectionTitle="Customer Segments"
          icon={<AiOutlineTeam />}
        />
        <Section
          sectionName="valuePropositions"
          sectionTitle="Value Propositions"
          icon={<AiOutlineBulb />}
        />
        <Section
          sectionName="channels"
          sectionTitle="Channels"
          icon={<AiOutlineDollarCircle />}
        />
        <Section
          sectionName="customerRelationships"
          sectionTitle="Customer Relationships"
          icon={<AiOutlineHeart />}
        />
        <Section
          sectionName="revenueStreams"
          sectionTitle="Revenue Streams"
          icon={<AiOutlineDollarCircle />}
        />
        <Section
          sectionName="keyResources"
          sectionTitle="Key Resources"
          icon={<AiOutlineDatabase />}
        />
        <Section
          sectionName="keyActivities"
          sectionTitle="Key Activities"
          icon={<AiOutlineProject />}
        />
        <Section
          sectionName="keyPartners"
          sectionTitle="Key Partners"
          icon={<AiOutlineHeart />}
        />
        <Section
          sectionName="cost"
          sectionTitle="Costs"
          icon={<AiOutlineTag />}
        />
      </div>
    </div>
  </StrategyLayout>
  );
};

export default BusinessPlan;
