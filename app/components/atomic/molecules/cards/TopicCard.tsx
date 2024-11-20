// /app/components/atomic/molecules/cards/TopicCard.tsx

import React from "react";
import { Topic } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface TopicCardProps {
  topic: Topic;
  onToggleSubscription: (topicId: string) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onToggleSubscription }) => {
  return (
    <div
      className="relative group cursor-pointer rounded-xl overflow-hidden bg-gray-800 p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      ></div>

      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-white text-xl font-semibold mb-2">{topic.category}</h3>
        <p className="text-white text-sm mb-4">{topic.description}</p>
        {topic.preferences?.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-white mb-2">Preferences:</p>
            <div className="flex flex-wrap gap-2">
              {topic.preferences.map((pref, i) => (
                <Badge key={i} variant="default">
                  {pref}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm text-white">
            Visibility: {topic.visibility.charAt(0).toUpperCase() + topic.visibility.slice(1)}
          </p>
          <Switch
            checked={topic.visibility === "public"}
            onCheckedChange={() => onToggleSubscription(topic.id)}
            className="w-10 h-6 bg-gray-200 rounded-full relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span
              className={`block w-4 h-4 bg-white rounded-full transition-transform ${
                topic.visibility === "public" ? "translate-x-4" : "translate-x-0"
              }`}
            ></span>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
