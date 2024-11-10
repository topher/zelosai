"use client";
import React, { useEffect, useState } from "react";
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
import StrategyLayout from "../../../../components/atomic/ttemplates/StrategyLayout";

const BusinessPlan = () => {
  const [businessModelCards, setBusinessModelCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/resource/business_model_cards");
        if (response.ok) {
          const data = await response.json();
          setBusinessModelCards(data.resources); // Assuming API returns resources
        } else {
          throw new Error("Failed to fetch business model cards");
        }
      } catch (err) {
        setError("Failed to load business model data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading business model data...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Filter cards by sectionName
  const getCardsBySection = (sectionName: string) =>
    businessModelCards.filter((card) => card.sectionName === sectionName);

  return (
    <StrategyLayout>
      <div className="space-y-8 p-6">
        {/* Sections */}
        <div>
          <Section
            sectionName="customerSegments"
            sectionTitle="Customer Segments"
            icon={<AiOutlineTeam />}
            cards={getCardsBySection("customerSegments")} // Pass cards for customer segments
          />
          <Section
            sectionName="valuePropositions"
            sectionTitle="Value Propositions"
            icon={<AiOutlineBulb />}
            cards={getCardsBySection("valuePropositions")}
          />
          <Section
            sectionName="channels"
            sectionTitle="Channels"
            icon={<AiOutlineDollarCircle />}
            cards={getCardsBySection("channels")}
          />
          <Section
            sectionName="customerRelationships"
            sectionTitle="Customer Relationships"
            icon={<AiOutlineHeart />}
            cards={getCardsBySection("customerRelationships")}
          />
          <Section
            sectionName="revenueStreams"
            sectionTitle="Revenue Streams"
            icon={<AiOutlineDollarCircle />}
            cards={getCardsBySection("revenueStreams")}
          />
          <Section
            sectionName="keyResources"
            sectionTitle="Key Resources"
            icon={<AiOutlineDatabase />}
            cards={getCardsBySection("keyResources")}
          />
          <Section
            sectionName="keyActivities"
            sectionTitle="Key Activities"
            icon={<AiOutlineProject />}
            cards={getCardsBySection("keyActivities")}
          />
          <Section
            sectionName="keyPartners"
            sectionTitle="Key Partners"
            icon={<AiOutlineHeart />}
            cards={getCardsBySection("keyPartners")}
          />
          <Section
            sectionName="cost"
            sectionTitle="Costs"
            icon={<AiOutlineTag />}
            cards={getCardsBySection("cost")}
          />
        </div>
      </div>
    </StrategyLayout>
  );
};

export default BusinessPlan;
