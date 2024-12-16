// /app/components/atomic/molecules/cards/GoalCard.tsx

import React from "react";
import { Goal } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Info, Pencil, Trash } from "lucide-react";

interface GoalCardProps {
  goal: Goal;
  toggleGoalStatus: (goal: Goal) => void;
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, toggleGoalStatus, onEdit, onDelete }) => {
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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-xl font-semibold">{goal.Goal}</h3>
          <Switch
            checked={goal.isActive}
            onCheckedChange={() => toggleGoalStatus(goal)}
            className="focus:ring-blue-500"
          />
        </div>
        <p className="text-white text-sm mb-4">{goal.Description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-sm font-medium text-white">Strategic Indicator:</span>
          <Badge>{goal.StrategicIndicator || "N/A"}</Badge>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-sm font-medium text-white">KPI:</span>
          <Badge>{goal.KPI || "N/A"}</Badge>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-sm font-medium text-white">Developer:</span>
          <Badge>{goal.Developer || "N/A"}</Badge>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm font-medium text-white">Related Issues:</span>
          {goal.RelatedIssues?.length ? (
            goal.RelatedIssues.map((issue, i) => (
              <Badge key={i}>{issue}</Badge>
            ))
          ) : (
            <Badge>N/A</Badge>
          )}
        </div>
        <div className="flex items-center justify-end mt-auto text-gray-500">
          <Info size={16} className="mr-2" />
          <span>Additional information</span>
        </div>
        {/* Edit and Delete Buttons */}
        <div className="flex justify-end mt-4 space-x-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(goal)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(goal.id)}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
