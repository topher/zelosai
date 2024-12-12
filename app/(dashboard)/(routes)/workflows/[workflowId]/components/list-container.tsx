// /app/(dashboard)/(routes)/workflows/[workflowId]/components/list-container.tsx

'use client';

import { Droppable } from '@hello-pangea/dnd';
import { CardItem } from './card-item';
import { List } from '@/app/types';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

interface ListContainerProps {
  boardId: string;
  data: List[];
};

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  return (
    <div className="flex gap-6 min-h-full">
      {data.map((list) => (
        <div
          key={list.id}
          className="relative min-w-[250px] rounded-xl border border-white/10 shadow-md p-4 bg-gray-800 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
          }}
        >
          {/* Subtle radial overlay pattern */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at top left, rgba(255,255,255,0.1) 2%, transparent 20%) repeat',
              backgroundSize: '20px 20px'
            }}
          ></div>

          <h2
            className={`relative z-10 text-white text-sm font-semibold mb-3 uppercase tracking-wide ${montserrat.className} border-b border-white/10 pb-1`}
          >
            {list.title}
          </h2>
          <Droppable droppableId={list.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col gap-3 relative z-10"
              >
                {list.cards.map((card, cardIndex) => (
                  <CardItem key={card.id} data={card} index={cardIndex} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </div>
  );
};
