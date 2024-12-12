// /app/(dashboard)/(routes)/workflows/[workflowId]/components/card-item.tsx

'use client';

import { Card } from "@/app/types";
import { Draggable } from '@hello-pangea/dnd';
import { useCardModal } from "@/hooks/use-card-modal";

interface CardItemProps {
  data: Card;
  index: number;
};

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();
  const draggableId = typeof data.id === 'string' ? data.id : String(data.id);

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
              select-none cursor-grab rounded-md p-3 border border-white/10 text-white text-sm font-medium truncate shadow-md
              bg-gray-800
              transition-transform duration-200 relative
              hover:scale-[1.02] hover:shadow-lg hover:shadow-black/50
              ${isDragging ? 'z-50 bg-primary scale-105 ring-2 ring-white/20 shadow-2xl' : ''}
            `}
          >
            {data.title}
          </div>
        );
      }}
    </Draggable>
  );
};
