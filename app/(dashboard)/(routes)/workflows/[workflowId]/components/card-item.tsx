'use client';

import { Card } from "@/app/types";
import { Draggable } from '@hello-pangea/dnd';
import { useCardModal } from "@/hooks/use-card-modal";

interface CardItemProps {
  data: Card & {
    priority?: string;
    relatedAgents?: string[];
  };
  index: number;
  agentsDict?: { [key: string]: { name: string; image: string } }; // Minimal agent info
};

export const CardItem = ({ data, index, agentsDict = {} }: CardItemProps) => {
  const cardModal = useCardModal();
  const draggableId = typeof data.id === 'string' ? data.id : String(data.id);

  // Map relatedAgents to agent image URLs (if any)
  const agentImages = (data.relatedAgents || []).map((agentId) => {
    const agent = agentsDict[agentId];
    return agent?.image || null;
  }).filter(Boolean);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => {
        const isDragging = snapshot.isDragging;
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
            onClick={() => cardModal.onOpen(data.id)}
            className={`
              relative select-none cursor-grab rounded-md p-3 border border-white/10 text-white text-sm font-medium
              shadow-md bg-gray-800 whitespace-normal break-words
              transition-transform duration-200
              hover:scale-[1.02] hover:shadow-lg hover:shadow-black/50
              ${isDragging ? 'z-50 bg-primary scale-105 ring-2 ring-white/20 shadow-2xl' : ''}
            `}
          >
            <div className="flex flex-col space-y-2">
              <span className="break-words">{data.title}</span>
            </div>
            
            {/* Priority in bottom-left */}
            {/* {data.priority && (
              <div className="absolute bottom-2 left-2 text-xs bg-gray-700 text-white px-2 py-1 rounded">
                {data.priority}
              </div>
            )} */}

            {/* Agents in bottom-right */}
            {agentImages.length > 0 && (
              <div className="absolute bottom-2 right-2 flex -space-x-1">
                {agentImages.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={`../${imgUrl}`}
                    alt="Agent Avatar"
                    className="w-5 h-5 rounded-full border-2 border-gray-800"
                  />
                ))}
              </div>
            )}
          </div>
        );
      }}
    </Draggable>
  );
};